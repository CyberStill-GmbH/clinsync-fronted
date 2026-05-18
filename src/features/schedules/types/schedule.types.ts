export interface Schedule {
  id: string;
  area: string;
  doctor?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Disponible' | 'Ocupado' | 'Inactivo';
  assignedAppointments: number;
}
