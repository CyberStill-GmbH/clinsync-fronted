import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { Doctor } from "../types/doctor.types";

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    fullName: 'Dr. Carlos Méndez',
    document: 'CMP 12345',
    phone: '987654321',
    email: 'carlos.mendez@clinsync.com',
    medicalArea: 'Cardiología',
    isActive: true,
  },
  {
    id: '2',
    fullName: 'Dra. Ana Torres',
    document: 'CMP 54321',
    phone: '912345678',
    email: 'ana.torres@clinsync.com',
    medicalArea: 'Medicina General',
    isActive: true,
  },
  {
    id: '3',
    fullName: 'Dr. Roberto Silva',
    phone: '923456789',
    email: 'roberto.silva@clinsync.com',
    medicalArea: 'Traumatología',
    isActive: true,
  },
  {
    id: '4',
    fullName: 'Dra. María López',
    document: 'CMP 98765',
    phone: '934567890',
    email: 'maria.lopez@clinsync.com',
    medicalArea: 'Dermatología',
    isActive: false,
  },
];

export async function getAdminDoctors(): Promise<Doctor[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockDoctors), 500));
  }
  const { data } = await httpClient.get<Doctor[]>(endpoints.doctors.adminList);
  return data;
}

export async function createDoctor(payload: Partial<Doctor>): Promise<Doctor> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now().toString(), ...payload } as Doctor), 500));
  }
  const { data } = await httpClient.post<Doctor>(endpoints.doctors.create, payload);
  return data;
}
