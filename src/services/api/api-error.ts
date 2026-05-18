export class ApiError extends Error {
  statusCode: number;
  originalError?: unknown;

  constructor(statusCode: number, message: string, originalError?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (typeof error === 'object' && error !== null && 'isAxiosError' in error && (error as any).isAxiosError) {
    const axiosError = error as any;
    const status = axiosError.response?.status || 500;
    return new ApiError(status, getErrorMessage({ status }), error);
  }

  return new ApiError(500, getErrorMessage({ status: 500 }), error);
}

export function getErrorMessage(error: { status?: number }): string {
  switch (error.status) {
    case 400:
      return 'La información enviada no es válida.';
    case 401:
      return 'Tu sesión ha expirado. Inicia sesión nuevamente.';
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'No se encontró el recurso solicitado.';
    case 409:
      return 'El horario seleccionado ya no está disponible.';
    default:
      return 'Ocurrió un error inesperado. Intenta nuevamente.';
  }
}
