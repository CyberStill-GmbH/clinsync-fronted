export const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  useMocks: import.meta.env.VITE_USE_MOCKS === "true",
};
