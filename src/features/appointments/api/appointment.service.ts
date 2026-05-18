import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";

export const mockMyAppointments: Appointment[] = [
  {
    id: '1',
    area: 'Cardiología',
    date: '2026-05-24',
    time: '10:30 AM',
    status: 'Confirmada',
    professional: 'Dr. Carlos Méndez',
    code: 'APT-2026-001',
    reason: 'Control de presión arterial',
  },
  {
    id: '2',
    area: 'Dermatología',
    date: '2026-05-27',
    time: '3:00 PM',
    status: 'Pendiente',
    code: 'APT-2026-002',
  },
  {
    id: '3',
    area: 'Medicina General',
    date: '2026-05-30',
    time: '11:00 AM',
    status: 'Validada por recepción',
    professional: 'Dra. Ana Torres',
    code: 'APT-2026-003',
  },
  {
    id: '4',
    area: 'Traumatología',
    date: '2026-05-14',
    time: '9:00 AM',
    status: 'Atendida',
    professional: 'Dr. Roberto Silva',
    code: 'APT-2026-004',
  },
  {
    id: '5',
    area: 'Oftalmología',
    date: '2026-05-10',
    time: '2:30 PM',
    status: 'Atendida',
    professional: 'Dra. María López',
    code: 'APT-2026-005',
  },
  {
    id: '6',
    area: 'Psicología',
    date: '2026-05-08',
    time: '4:00 PM',
    status: 'Cancelada por recepción',
    code: 'APT-2026-006',
  },
  {
    id: '7',
    area: 'Pediatría',
    date: '2026-05-06',
    time: '10:00 AM',
    status: 'No asistió',
    code: 'APT-2026-007',
  },
];

export const mockAdminAppointments: Appointment[] = [
  {
    id: '1',
    code: 'APT-2026-001',
    patientName: 'Mariana García López',
    patientDni: '12345678',
    patientPhone: '987654321',
    patientEmail: 'mariana@example.com',
    area: 'Cardiología',
    professional: 'Dr. Carlos Méndez',
    date: '2026-05-24',
    time: '10:30 AM',
    status: 'Pendiente',
    reason: 'Control de presión arterial',
  },
  {
    id: '2',
    code: 'APT-2026-002',
    patientName: 'José Rodríguez Silva',
    patientDni: '87654321',
    patientPhone: '912345678',
    patientEmail: 'jose@example.com',
    area: 'Traumatología',
    professional: 'Dr. Roberto Silva',
    date: '2026-05-24',
    time: '11:00 AM',
    status: 'Validada por recepción',
  },
  {
    id: '3',
    code: 'APT-2026-003',
    patientName: 'Ana Torres Morales',
    patientDni: '45678912',
    patientPhone: '923456789',
    patientEmail: 'ana@example.com',
    area: 'Dermatología',
    date: '2026-05-27',
    time: '02:00 PM',
    status: 'Confirmada',
  },
  {
    id: '4',
    code: 'APT-2026-004',
    patientName: 'Carlos Mendoza Ruiz',
    patientDni: '78945612',
    patientPhone: '934567890',
    patientEmail: 'carlos@example.com',
    area: 'Medicina General',
    professional: 'Dra. Ana Torres',
    date: '2026-05-23',
    time: '03:30 PM',
    status: 'Atendida',
  },
  {
    id: '5',
    code: 'APT-2026-005',
    patientName: 'Lucía Fernández Castro',
    patientDni: '32165498',
    patientPhone: '945678901',
    patientEmail: 'lucia@example.com',
    area: 'Pediatría',
    date: '2026-05-22',
    time: '04:00 PM',
    status: 'No asistió',
  },
];

export function mapBackendAppointment(apt: any): Appointment {
  const statusMap: Record<string, AppointmentStatus> = {
    'PENDING': 'Pendiente',
    'CONFIRMED': 'Confirmada',
    'VALIDATED_BY_RECEPTION': 'Validada por recepción',
    'RESCHEDULED': 'Reprogramada',
    'ATTENDED': 'Atendida',
    'NO_SHOW': 'No asistió',
    'CANCELLED_BY_RECEPTION': 'Cancelada por recepción',
  };

  const uiStatus = statusMap[apt.status] || 'Pendiente';

  let formattedDate = "";
  if (apt.schedule?.date) {
    try {
      formattedDate = new Date(apt.schedule.date).toISOString().split('T')[0];
    } catch {
      formattedDate = apt.schedule.date;
    }
  } else if (apt.date) {
    formattedDate = apt.date;
  }

  let formattedTime = "";
  if (apt.schedule?.startTime) {
    formattedTime = apt.schedule.startTime;
    if (apt.schedule.endTime) {
      formattedTime += ` - ${apt.schedule.endTime}`;
    }
  } else if (apt.time) {
    formattedTime = apt.time;
  }

  let pName = apt.patient?.fullName;
  if (!pName && apt.patient) {
    pName = `${apt.patient.firstName || ''} ${apt.patient.lastName || ''}`.trim();
  }

  return {
    id: apt.id,
    code: apt.code || "",
    area: apt.area?.name || apt.areaId || "",
    date: formattedDate,
    time: formattedTime,
    status: uiStatus,
    professional: apt.doctor?.fullName || apt.doctorId || undefined,
    reason: apt.reason || undefined,
    patientName: pName || undefined,
    patientDni: apt.patient?.dni || undefined,
    patientEmail: apt.patient?.user?.email || apt.patient?.email || undefined,
    patientPhone: apt.patient?.phone || undefined,
  };
}

export async function getMyAppointments(): Promise<Appointment[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockMyAppointments), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.appointments.myAppointments);
  return data.map(mapBackendAppointment);
}

export async function getAdminAppointments(): Promise<Appointment[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAdminAppointments), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.appointments.adminList);
  return data.map(mapBackendAppointment);
}

export async function createAppointment(payload: any): Promise<Appointment> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now().toString(), code: "APT-NEW", ...payload } as Appointment), 500));
  }
  const { data } = await httpClient.post<any>(endpoints.appointments.create, payload);
  return mapBackendAppointment(data);
}

export async function validateAppointment(appointmentId: string): Promise<Appointment> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: appointmentId } as Appointment), 500));
  }
  const { data } = await httpClient.patch<any>(endpoints.appointments.validate(appointmentId));
  return mapBackendAppointment(data);
}

export async function rescheduleAppointment(appointmentId: string, payload: any): Promise<Appointment> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: appointmentId } as Appointment), 500));
  }
  const { data } = await httpClient.patch<any>(endpoints.appointments.reschedule(appointmentId), payload);
  return mapBackendAppointment(data);
}

export async function cancelAppointment(appointmentId: string, payload: any): Promise<Appointment> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: appointmentId } as Appointment), 500));
  }
  const { data } = await httpClient.patch<any>(endpoints.appointments.cancel(appointmentId), payload);
  return mapBackendAppointment(data);
}

export async function updateAppointmentAttendance(appointmentId: string, payload: any): Promise<Appointment> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve({ id: appointmentId } as Appointment), 500));
  }
  const { data } = await httpClient.patch<any>(endpoints.appointments.attendance(appointmentId), payload);
  return mapBackendAppointment(data);
}
