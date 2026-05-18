import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { Schedule } from "../types/schedule.types";

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    area: 'Cardiología',
    doctor: 'Dr. Carlos Méndez',
    date: '2026-05-24',
    startTime: '08:00',
    endTime: '12:00',
    status: 'Disponible',
    assignedAppointments: 3,
  },
  {
    id: '2',
    area: 'Medicina General',
    doctor: 'Dra. Ana Torres',
    date: '2026-05-24',
    startTime: '14:00',
    endTime: '18:00',
    status: 'Disponible',
    assignedAppointments: 5,
  },
  {
    id: '3',
    area: 'Traumatología',
    doctor: 'Dr. Roberto Silva',
    date: '2026-05-25',
    startTime: '08:00',
    endTime: '13:00',
    status: 'Ocupado',
    assignedAppointments: 8,
  },
  {
    id: '4',
    area: 'Dermatología',
    date: '2026-05-25',
    startTime: '15:00',
    endTime: '19:00',
    status: 'Disponible',
    assignedAppointments: 2,
  },
  {
    id: '5',
    area: 'Pediatría',
    date: '2026-05-26',
    startTime: '09:00',
    endTime: '14:00',
    status: 'Inactivo',
    assignedAppointments: 0,
  },
];

export function mapBackendSchedule(s: any): Schedule {
  let uiStatus: 'Disponible' | 'Ocupado' | 'Inactivo' = 'Disponible';
  if (s.status === 'OCCUPIED') {
    uiStatus = 'Ocupado';
  } else if (s.status === 'INACTIVE') {
    uiStatus = 'Inactivo';
  }

  let formattedDate = "";
  if (s.date) {
    try {
      formattedDate = new Date(s.date).toISOString().split('T')[0];
    } catch {
      formattedDate = s.date;
    }
  }

  return {
    id: s.id,
    area: s.area?.name || s.areaId || "",
    doctor: s.doctor?.fullName || s.doctorId || undefined,
    date: formattedDate,
    startTime: s.startTime || "",
    endTime: s.endTime || "",
    status: uiStatus,
    assignedAppointments: s.appointments?.length || s.assignedAppointments || 0,
  };
}

export async function getAdminSchedules(): Promise<Schedule[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockSchedules), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.schedules.adminList);
  return data.map(mapBackendSchedule);
}

export async function getPatientSchedules(): Promise<Schedule[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockSchedules.filter(s => s.status === 'Disponible')), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.schedules.available);
  return data.map(mapBackendSchedule);
}

export async function getSchedulesByArea(areaId: string): Promise<Schedule[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockSchedules.filter(s => s.status === 'Disponible')), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.schedules.byArea(areaId));
  return data.map(mapBackendSchedule);
}

export async function createSchedule(payload: any): Promise<Schedule> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now().toString(), ...payload, assignedAppointments: 0, status: payload.status || 'Disponible' } as Schedule), 500));
  }
  const { data } = await httpClient.post<any>(endpoints.schedules.create, payload);
  return mapBackendSchedule(data);
}
