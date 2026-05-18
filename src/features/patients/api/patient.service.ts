import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { Patient } from "../types/patient.types";

export const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Mariana García López',
    dni: '12345678',
    phone: '987654321',
    email: 'mariana@example.com',
    birthDate: '1990-05-15',
    address: 'Av. Los Pinos 123',
    district: 'Miraflores',
    emergencyContact: 'Carlos García',
    emergencyPhone: '998877665',
    lastAppointment: '2026-05-20',
    totalAppointments: 12,
  },
  {
    id: '2',
    fullName: 'José Rodríguez Silva',
    dni: '87654321',
    phone: '912345678',
    email: 'jose@example.com',
    birthDate: '1985-08-22',
    address: 'Jr. Las Flores 456',
    district: 'San Isidro',
    lastAppointment: '2026-05-18',
    totalAppointments: 8,
  },
  {
    id: '3',
    fullName: 'Ana Torres Morales',
    dni: '45678912',
    phone: '923456789',
    email: 'ana@example.com',
    birthDate: '1992-11-30',
    lastAppointment: '2026-05-15',
    totalAppointments: 15,
  },
  {
    id: '4',
    fullName: 'Carlos Mendoza Ruiz',
    dni: '78945612',
    phone: '934567890',
    email: 'carlos@example.com',
    birthDate: '1988-03-10',
    address: 'Calle Los Robles 789',
    district: 'Surco',
    lastAppointment: '2026-05-10',
    totalAppointments: 6,
  },
];

export async function getAdminPatients(): Promise<Patient[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockPatients), 500));
  }
  const { data } = await httpClient.get<Patient[]>(endpoints.admin.patients);
  return data;
}
