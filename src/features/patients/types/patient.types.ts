export interface Patient {
  id: string;
  fullName: string;
  dni: string;
  phone: string;
  email: string;
  birthDate: string;
  address?: string;
  district?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  lastAppointment: string;
  totalAppointments: number;
}
