export type AppointmentStatus =
  | "Pendiente"
  | "Confirmada"
  | "Validada por recepción"
  | "Reprogramada"
  | "Atendida"
  | "No asistió"
  | "Cancelada por recepción";

export interface Appointment {
  id: string;
  area: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  professional?: string;
  code: string;
  reason?: string;
  patientName?: string;
  patientDni?: string;
  patientEmail?: string;
  patientPhone?: string;
}
