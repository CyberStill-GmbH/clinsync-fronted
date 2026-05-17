import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type AppointmentStatus =
  | 'Pendiente'
  | 'Confirmada'
  | 'Validada por recepción'
  | 'Reprogramada'
  | 'Atendida'
  | 'No asistió'
  | 'Cancelada por recepción';

interface Appointment {
  id: string;
  area: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  professional?: string;
  code: string;
  reason?: string;
}

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    area: 'Cardiología',
    date: 'Viernes, 24 de mayo',
    time: '10:30 AM',
    status: 'Confirmada',
    professional: 'Dr. Carlos Méndez',
    code: 'APT-2026-001',
    reason: 'Control de presión arterial',
  },
  {
    id: '2',
    area: 'Dermatología',
    date: 'Lunes, 27 de mayo',
    time: '3:00 PM',
    status: 'Pendiente',
    code: 'APT-2026-002',
  },
  {
    id: '3',
    area: 'Medicina General',
    date: 'Jueves, 30 de mayo',
    time: '11:00 AM',
    status: 'Validada por recepción',
    professional: 'Dra. Ana Torres',
    code: 'APT-2026-003',
  },
];

const historyAppointments: Appointment[] = [
  {
    id: '4',
    area: 'Traumatología',
    date: 'Martes, 14 de mayo',
    time: '9:00 AM',
    status: 'Atendida',
    professional: 'Dr. Roberto Silva',
    code: 'APT-2026-004',
  },
  {
    id: '5',
    area: 'Oftalmología',
    date: 'Viernes, 10 de mayo',
    time: '2:30 PM',
    status: 'Atendida',
    professional: 'Dra. María López',
    code: 'APT-2026-005',
  },
];

const cancelledAppointments: Appointment[] = [
  {
    id: '6',
    area: 'Psicología',
    date: 'Miércoles, 8 de mayo',
    time: '4:00 PM',
    status: 'Cancelada por recepción',
    code: 'APT-2026-006',
  },
  {
    id: '7',
    area: 'Pediatría',
    date: 'Lunes, 6 de mayo',
    time: '10:00 AM',
    status: 'No asistió',
    code: 'APT-2026-007',
  },
];

const getStatusBadge = (status: AppointmentStatus) => {
  const statusConfig = {
    'Pendiente': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
    'Confirmada': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    'Validada por recepción': { bg: 'bg-teal-100', text: 'text-teal-700', icon: CheckCircle },
    'Reprogramada': { bg: 'bg-purple-100', text: 'text-purple-700', icon: Calendar },
    'Atendida': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle },
    'No asistió': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    'Cancelada por recepción': { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">{appointment.area}</h3>
          <p className="text-sm text-[#64748B] mb-2">Código: {appointment.code}</p>
          {appointment.professional && (
            <p className="text-sm text-[#64748B]">{appointment.professional}</p>
          )}
        </div>
        {getStatusBadge(appointment.status)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-[#64748B]">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-[#64748B]">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-[#64748B] sm:col-span-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Sede Principal</span>
        </div>
      </div>

      {appointment.reason && (
        <div className="mb-4 p-3 bg-[#F8FAFC] rounded-lg">
          <p className="text-xs text-[#64748B] mb-1">Motivo de consulta</p>
          <p className="text-sm text-[#0F172A]">{appointment.reason}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex-1 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg text-sm font-medium transition-colors"
        >
          {showDetails ? 'Ocultar detalle' : 'Ver detalle'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  ¿Necesitas reprogramar o cancelar?
                </p>
                <p className="text-sm text-blue-700">
                  Para reprogramar o cancelar, comunícate con recepción al{' '}
                  <span className="font-medium inline-flex items-center gap-1"><Phone className="w-3 h-3"/>+51 987 654 321</span> o escribe a{' '}
                  <span className="font-medium">citas@clinsync.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function MyAppointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'cancelled'>('upcoming');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const getCurrentAppointments = () => {
    if (activeTab === 'upcoming') return upcomingAppointments;
    if (activeTab === 'history') return historyAppointments;
    return cancelledAppointments;
  };

  const filteredAppointments = getCurrentAppointments().filter((apt) => {
    if (selectedArea && apt.area !== selectedArea) return false;
    if (selectedStatus && apt.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Mis Citas</h1>
        <p className="text-[#64748B]">
          Gestiona y consulta todas tus citas médicas.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Próximas ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Historial ({historyAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'cancelled'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Canceladas ({cancelledAppointments.length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-semibold text-[#0F172A] mb-4">Filtros</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="area-filter" className="block text-sm font-medium text-[#0F172A] mb-2">
              Área médica
            </label>
            <select
              id="area-filter"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="">Todas las áreas</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Traumatología">Traumatología</option>
              <option value="Psicología">Psicología</option>
            </select>
          </div>

          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-[#0F172A] mb-2">
              Estado
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Validada por recepción">Validada por recepción</option>
              <option value="Atendida">Atendida</option>
              <option value="Cancelada por recepción">Cancelada</option>
            </select>
          </div>

          {(selectedArea || selectedStatus) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedArea('');
                  setSelectedStatus('');
                }}
                className="w-full px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] rounded-lg text-sm font-medium transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-2">
              {activeTab === 'upcoming' && 'No tienes citas próximas'}
              {activeTab === 'history' && 'No tienes citas en el historial'}
              {activeTab === 'cancelled' && 'No tienes citas canceladas'}
            </h3>
            <p className="text-sm text-[#64748B] mb-4">
              {activeTab === 'upcoming' && 'Tus próximas citas aparecerán aquí'}
              {activeTab === 'history' && 'El historial de tus citas pasadas aparecerá aquí'}
              {activeTab === 'cancelled' && 'Las citas canceladas aparecerán aquí'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
