import { useNavigate } from 'react-router';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Stethoscope,
  UserCog,
  ArrowRight
} from 'lucide-react';

const summaryCards = [
  {
    id: 1,
    title: 'Citas de hoy',
    value: '24',
    subtitle: '8 pendientes de validación',
    icon: Calendar,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Pendientes',
    value: '6',
    subtitle: 'Requieren revisión',
    icon: AlertCircle,
    color: 'amber',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 3,
    title: 'Validadas',
    value: '15',
    subtitle: 'Listas para atención',
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 4,
    title: 'No asistió',
    value: '3',
    subtitle: 'Registradas hoy',
    icon: XCircle,
    color: 'red',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 5,
    title: 'Horarios disponibles',
    value: '42',
    subtitle: 'Para esta semana',
    icon: Clock,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const upcomingAppointments = [
  {
    id: '1',
    code: 'APT-2026-001',
    patient: 'Mariana García López',
    dni: '12345678',
    area: 'Cardiología',
    doctor: 'Dr. Carlos Méndez',
    date: 'Hoy',
    time: '10:30 AM',
    status: 'Pendiente',
  },
  {
    id: '2',
    code: 'APT-2026-002',
    patient: 'José Rodríguez Silva',
    dni: '87654321',
    area: 'Traumatología',
    doctor: 'Dr. Roberto Silva',
    date: 'Hoy',
    time: '11:00 AM',
    status: 'Validada',
  },
  {
    id: '3',
    code: 'APT-2026-003',
    patient: 'Ana Torres Morales',
    dni: '45678912',
    area: 'Dermatología',
    date: 'Hoy',
    time: '02:00 PM',
    status: 'Confirmada',
  },
  {
    id: '4',
    code: 'APT-2026-004',
    patient: 'Carlos Mendoza Ruiz',
    dni: '78945612',
    area: 'Medicina General',
    doctor: 'Dra. Ana Torres',
    date: 'Hoy',
    time: '03:30 PM',
    status: 'Pendiente',
  },
  {
    id: '5',
    code: 'APT-2026-005',
    patient: 'Lucía Fernández Castro',
    dni: '32165498',
    area: 'Pediatría',
    date: 'Hoy',
    time: '04:00 PM',
    status: 'Validada',
  },
];

const getStatusBadge = (status: string) => {
  const config: Record<string, { bg: string; text: string }> = {
    'Pendiente': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'Confirmada': { bg: 'bg-green-100', text: 'text-green-700' },
    'Validada': { bg: 'bg-teal-100', text: 'text-teal-700' },
  };

  const style = config[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {status}
    </span>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-[#0F172A]">{card.value}</p>
                <h3 className="font-semibold text-[#0F172A]">{card.title}</h3>
                <p className="text-sm text-[#64748B]">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/appointments')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors">
              <CheckCircle className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Validar citas pendientes</h3>
            <p className="text-sm text-[#64748B]">Revisar citas por validar</p>
          </button>

          <button
            onClick={() => navigate('/admin/schedules')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2] transition-colors">
              <Clock className="w-6 h-6 text-[#0891B2] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Crear horario</h3>
            <p className="text-sm text-[#64748B]">Configurar disponibilidad</p>
          </button>

          <button
            onClick={() => navigate('/admin/doctors')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <UserCog className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Registrar médico</h3>
            <p className="text-sm text-[#64748B]">Agregar nuevo médico</p>
          </button>

          <button
            onClick={() => navigate('/admin/patients')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
              <Users className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Buscar paciente</h3>
            <p className="text-sm text-[#64748B]">Consultar información</p>
          </button>
        </div>
      </div>

      {/* Upcoming Appointments Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Próximas citas de hoy</h2>
          <button
            onClick={() => navigate('/admin/appointments')}
            className="text-sm text-[#2563EB] hover:underline font-medium flex items-center gap-1"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Código
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Paciente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    DNI
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Área
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Médico
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Hora
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {upcomingAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    onClick={() => navigate('/admin/appointments')}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#0F172A]">{appointment.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#0F172A]">{appointment.patient}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#64748B]">{appointment.dni}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#0F172A]">{appointment.area}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#64748B]">{appointment.doctor || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#0F172A]">{appointment.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(appointment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => navigate('/admin/appointments')}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{appointment.patient}</h3>
                  <p className="text-sm text-[#64748B]">{appointment.code}</p>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#0F172A]">{appointment.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#0F172A]">{appointment.time}</span>
                </div>
                {appointment.doctor && (
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#64748B]">{appointment.doctor}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-2">Alertas operativas</h3>
            <ul className="space-y-2">
              <li className="text-sm text-amber-800">
                • 6 citas pendientes de validación para hoy
              </li>
              <li className="text-sm text-amber-800">
                • 3 pacientes no asistieron en la última semana
              </li>
              <li className="text-sm text-amber-800">
                • Revisar disponibilidad de horarios para mañana
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
