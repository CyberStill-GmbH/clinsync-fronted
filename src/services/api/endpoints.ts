export const endpoints = {
  auth: {
    registerPatient: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },

  patient: {
    me: "/patients/me",
    updateMe: "/patients/me",
  },

  areas: {
    list: "/areas",
    detail: (areaId: string) => `/areas/${areaId}`,
    adminList: "/admin/areas",
    create: "/admin/areas",
    update: (areaId: string) => `/admin/areas/${areaId}`,
    toggleStatus: (areaId: string) => `/admin/areas/${areaId}/status`,
  },

  doctors: {
    list: "/doctors",
    byArea: (areaId: string) => `/doctors?areaId=${areaId}`,
    adminList: "/admin/doctors",
    create: "/admin/doctors",
    update: (doctorId: string) => `/admin/doctors/${doctorId}`,
    toggleStatus: (doctorId: string) => `/admin/doctors/${doctorId}/status`,
  },

  schedules: {
    byArea: (areaId: string) => `/areas/${areaId}/schedules`,
    available: "/schedules/available",
    adminList: "/admin/schedules",
    create: "/admin/schedules",
    update: (scheduleId: string) => `/admin/schedules/${scheduleId}`,
    toggleStatus: (scheduleId: string) => `/admin/schedules/${scheduleId}/status`,
  },

  appointments: {
    create: "/appointments",
    myAppointments: "/appointments/me",
    myAppointmentDetail: (appointmentId: string) => `/appointments/me/${appointmentId}`,

    adminList: "/admin/appointments",
    adminDetail: (appointmentId: string) => `/admin/appointments/${appointmentId}`,
    validate: (appointmentId: string) => `/admin/appointments/${appointmentId}/validate`,
    reschedule: (appointmentId: string) => `/admin/appointments/${appointmentId}/reschedule`,
    cancel: (appointmentId: string) => `/admin/appointments/${appointmentId}/cancel`,
    attendance: (appointmentId: string) => `/admin/appointments/${appointmentId}/attendance`,
    updateStatus: (appointmentId: string) => `/admin/appointments/${appointmentId}/status`,
  },

  admin: {
    dashboard: "/admin/dashboard",
    patients: "/admin/patients",
    patientDetail: (patientId: string) => `/admin/patients/${patientId}`,
    patientAppointments: (patientId: string) => `/admin/patients/${patientId}/appointments`,
  },
};
