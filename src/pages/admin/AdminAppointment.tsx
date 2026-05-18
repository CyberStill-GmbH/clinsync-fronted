import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
  X,
  User,
  Phone,
  Mail,
  Stethoscope
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useAdminAppointments,
  useValidateAppointment,
  useRescheduleAppointment,
  useCancelAppointment,
  useUpdateAppointmentAttendance
} from '../../features/appointments/api/appointment.hooks';
import { getAreas } from '../../features/areas/api/area.service';
import { createSchedule, getSchedulesByArea } from '../../features/schedules/api/schedule.service';
import { appConfig } from '../../app/config';
import type { Appointment, AppointmentStatus } from '../../features/appointments/types/appointment.types';

const tabs = [
  { id: 'all', label: 'Todas' },
  { id: 'today', label: 'Hoy' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'validated', label: 'Validadas' },
  { id: 'rescheduled', label: 'Reprogramadas' },
  { id: 'cancelled', label: 'Canceladas' },
  { id: 'attended', label: 'Atendidas' },
  { id: 'no-show', label: 'No asistió' },
];

const getStatusBadge = (status: AppointmentStatus | string) => {
  const config: Record<string, { bg: string; text: string; icon: any; label: string }> = {
    'Pendiente': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock, label: 'Pendiente' },
    'PENDING': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock, label: 'Pendiente' },
    'Confirmada': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Confirmada' },
    'CONFIRMED': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Confirmada' },
    'Validada por recepción': { bg: 'bg-teal-100', text: 'text-teal-700', icon: CheckCircle, label: 'Validada por recepción' },
    'VALIDATED_BY_RECEPTION': { bg: 'bg-teal-100', text: 'text-teal-700', icon: CheckCircle, label: 'Validada por recepción' },
    'Reprogramada': { bg: 'bg-purple-100', text: 'text-purple-700', icon: Calendar, label: 'Reprogramada' },
    'RESCHEDULED': { bg: 'bg-purple-100', text: 'text-purple-700', icon: Calendar, label: 'Reprogramada' },
    'Atendida': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Atendida' },
    'ATTENDED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Atendida' },
    'No asistió': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'No asistió' },
    'NO_SHOW': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'No asistió' },
    'Cancelada por recepción': { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle, label: 'Cancelada por recepción' },
    'CANCELLED_BY_RECEPTION': { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle, label: 'Cancelada por recepción' },
  };

  const style = config[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: status };
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Icon className="w-3 h-3" />
      {style.label}
    </span>
  );
};

export default function AdminAppointments() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showValidate, setShowValidate] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const { data: allAppointments = [] } = useAdminAppointments();

  const filteredAppointments = useMemo(() => {
    return allAppointments.filter(apt => {
      // 1. Tab filter
      if (activeTab === 'today') {
        // Implement logic if needed, e.g. apt.date === today
      } else if (activeTab === 'pending' && apt.status !== 'Pendiente') return false;
      else if (activeTab === 'validated' && apt.status !== 'Validada por recepción') return false;
      else if (activeTab === 'rescheduled' && apt.status !== 'Reprogramada') return false;
      else if (activeTab === 'cancelled' && apt.status !== 'Cancelada por recepción') return false;
      else if (activeTab === 'attended' && apt.status !== 'Atendida') return false;
      else if (activeTab === 'no-show' && apt.status !== 'No asistió') return false;

      // 2. Search query (patient or DNI)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !apt.patientName?.toLowerCase().includes(query) &&
          !apt.patientDni?.includes(query)
        ) {
          return false;
        }
      }

      // 3. Area filter
      if (filterArea && apt.area !== filterArea) return false;

      // 4. Status filter
      if (filterStatus && apt.status !== filterStatus) return false;

      return true;
    });
  }, [allAppointments, activeTab, searchQuery, filterArea, filterStatus]);

  // Reschedule form
  const [rescheduleData, setRescheduleData] = useState({
    newDate: '',
    newTime: '',
    reason: '',
    notes: '',
  });

  // Cancel form
  const [cancelReason, setCancelReason] = useState('');

  // Attendance form
  const [attendanceType, setAttendanceType] = useState<'attended' | 'no-show'>('attended');
  const [attendanceNotes, setAttendanceNotes] = useState('');

  const openDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
    setActionMenuOpen(null);
  };

  const openValidate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowValidate(true);
    setActionMenuOpen(null);
  };

  const openReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowReschedule(true);
    setActionMenuOpen(null);
  };

  const openCancel = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowCancel(true);
    setActionMenuOpen(null);
  };

  const openAttendance = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAttendance(true);
    setActionMenuOpen(null);
  };

  const validateMutation = useValidateAppointment();
  const rescheduleMutation = useRescheduleAppointment();
  const cancelMutation = useCancelAppointment();
  const attendanceMutation = useUpdateAppointmentAttendance();

  const handleValidate = async () => {
    if (!selectedAppointment) return;
    try {
      await validateMutation.mutateAsync(selectedAppointment.id);
      window.dispatchEvent(new CustomEvent('clinsync_new_notification', {
        detail: {
          title: 'Cita Validada',
          message: `Has validado correctamente la cita de ${selectedAppointment.patientName || 'Paciente'} para ${selectedAppointment.area}.`,
          type: 'appointment'
        }
      }));
      toast.success('Cita validada correctamente');
      setShowValidate(false);
      setSelectedAppointment(null);
    } catch (err: any) {
      toast.error(err.message || 'Error al validar la cita');
    }
  };

  const handleReschedule = async () => {
    if (!selectedAppointment) return;
    if (!rescheduleData.newDate || !rescheduleData.newTime) {
      toast.error('La fecha y hora son obligatorias');
      return;
    }
    if (!rescheduleData.reason.trim()) {
      toast.error('El motivo de reprogramación es obligatorio');
      return;
    }

    if (appConfig.useMocks) {
      toast.success('Cita reprogramada correctamente');
      setShowReschedule(false);
      setSelectedAppointment(null);
      setRescheduleData({ newDate: '', newTime: '', reason: '', notes: '' });
      return;
    }

    try {
      const areas = await getAreas();
      const areaObj = areas.find(a => a.name === selectedAppointment.area);
      const areaId = areaObj?.id;
      if (!areaId) {
        toast.error('Especialidad de la cita no encontrada');
        return;
      }

      // Convert "08:00 AM" to "08:00"
      const rawTime = rescheduleData.newTime.split(' ')[0];
      const isPM = rescheduleData.newTime.includes('PM');
      let [hours, minutes] = rawTime.split(':');
      if (isPM && hours !== '12') {
        hours = String(Number(hours) + 12);
      } else if (!isPM && hours === '12') {
        hours = '00';
      }
      const startTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      
      let endHours = Number(hours);
      let endMinutes = Number(minutes) + 30;
      if (endMinutes >= 60) {
        endHours += 1;
        endMinutes -= 60;
      }
      const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

      const schedules = await getSchedulesByArea(String(areaId));
      let matchedSchedule = schedules.find(s => 
        s.date === rescheduleData.newDate && 
        s.startTime === startTime
      );

      let scheduleId = matchedSchedule?.id;

      if (!scheduleId) {
        const newSchedule = await createSchedule({
          areaId: String(areaId),
          date: rescheduleData.newDate,
          startTime,
          endTime,
          doctor: selectedAppointment.professional || 'Dra. Ana Torres',
        });
        scheduleId = newSchedule.id;
      }

      await rescheduleMutation.mutateAsync({
        appointmentId: selectedAppointment.id,
        payload: {
          newScheduleId: scheduleId,
          reason: rescheduleData.reason,
          internalNote: rescheduleData.notes || undefined,
        }
      });

      window.dispatchEvent(new CustomEvent('clinsync_new_notification', {
        detail: {
          title: 'Cita Reprogramada',
          message: `Has reprogramado la cita de ${selectedAppointment.patientName || 'Paciente'} para el ${rescheduleData.newDate}.`,
          type: 'appointment'
        }
      }));

      toast.success('Cita reprogramada correctamente');
      setShowReschedule(false);
      setSelectedAppointment(null);
      setRescheduleData({ newDate: '', newTime: '', reason: '', notes: '' });
    } catch (err: any) {
      toast.error(err.message || 'Error al reprogramar la cita');
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;
    if (!cancelReason.trim()) {
      toast.error('El motivo de cancelación es obligatorio');
      return;
    }
    if (cancelReason.trim().length < 5) {
      toast.error('El motivo debe tener al menos 5 caracteres');
      return;
    }
    try {
      await cancelMutation.mutateAsync({
        appointmentId: selectedAppointment.id,
        payload: {
          cancellationReason: cancelReason,
        }
      });
      window.dispatchEvent(new CustomEvent('clinsync_new_notification', {
        detail: {
          title: 'Cita Cancelada',
          message: `Has cancelado la cita de ${selectedAppointment.patientName || 'Paciente'} por el motivo: "${cancelReason}".`,
          type: 'system'
        }
      }));
      toast.success('Cita cancelada correctamente');
      setShowCancel(false);
      setSelectedAppointment(null);
      setCancelReason('');
    } catch (err: any) {
      toast.error(err.message || 'Error al cancelar la cita');
    }
  };

  const handleAttendance = async () => {
    if (!selectedAppointment) return;
    try {
      const dbStatus = attendanceType === 'attended' ? 'ATTENDED' : 'NO_SHOW';
      await attendanceMutation.mutateAsync({
        appointmentId: selectedAppointment.id,
        payload: {
          status: dbStatus as any,
          observation: attendanceNotes || undefined,
        }
      });
      window.dispatchEvent(new CustomEvent('clinsync_new_notification', {
        detail: {
          title: attendanceType === 'attended' ? 'Asistencia Registrada' : 'Inasistencia Registrada',
          message: `Marcaste la cita de ${selectedAppointment.patientName || 'Paciente'} como ${attendanceType === 'attended' ? 'asistió' : 'no asistió'}.`,
          type: 'system'
        }
      }));
      if (attendanceType === 'attended') {
        toast.success('Cita marcada como atendida');
      } else {
        toast.success('Cita marcada como no asistió');
      }
      setShowAttendance(false);
      setSelectedAppointment(null);
      setAttendanceType('attended');
      setAttendanceNotes('');
    } catch (err: any) {
      toast.error(err.message || 'Error al registrar asistencia');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-semibold text-[#0F172A] mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Paciente o DNI..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Área médica
            </label>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="">Todas las áreas</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Traumatología">Traumatología</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Estado
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Validada">Validada por recepción</option>
              <option value="Atendida">Atendida</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Código</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Paciente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Área</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Médico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Hora</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{appointment.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{appointment.patientName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{appointment.patientDni}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{appointment.area}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{appointment.professional || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{appointment.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{appointment.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === appointment.id ? null : appointment.id)}
                        className="p-2 hover:bg-[#E2E8F0] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-[#64748B]" />
                      </button>
                      {actionMenuOpen === appointment.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActionMenuOpen(null)}
                          />
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-20">
                            <button
                              onClick={() => openDetails(appointment)}
                              className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Ver detalle
                            </button>
                            <button
                              onClick={() => openValidate(appointment)}
                              className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Validar cita
                            </button>
                            <button
                              onClick={() => openReschedule(appointment)}
                              className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Reprogramar
                            </button>
                            <button
                              onClick={() => openCancel(appointment)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <XCircle className="w-4 h-4" />
                              Cancelar
                            </button>
                            <button
                              onClick={() => openAttendance(appointment)}
                              className="w-full px-4 py-2 text-left text-sm text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Marcar asistencia
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#0F172A] mb-1">{appointment.patientName}</h3>
                <p className="text-sm text-[#64748B]">{appointment.code}</p>
              </div>
              {getStatusBadge(appointment.status)}
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="text-[#64748B]">Área:</span>{' '}
                <span className="text-[#0F172A] font-medium">{appointment.area}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Fecha:</span>{' '}
                <span className="text-[#0F172A]">{appointment.date} • {appointment.time}</span>
              </p>
            </div>
            <button
              onClick={() => openDetails(appointment)}
              className="w-full px-4 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {/* Details Sheet */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div
            className="absolute inset-0"
            onClick={() => setShowDetails(false)}
          />
          <div className="relative w-full max-w-lg h-full bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">Detalle de cita</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-sm text-[#64748B] mb-1">Código de cita</p>
                <p className="font-bold text-[#0F172A] text-lg">{selectedAppointment.code}</p>
              </div>

              <div>
                <p className="text-sm text-[#64748B] mb-2">Estado actual</p>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2563EB]" />
                  Datos del paciente
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-[#64748B]">Nombre completo</p>
                    <p className="font-medium text-[#0F172A]">{selectedAppointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">DNI</p>
                    <p className="font-medium text-[#0F172A]">{selectedAppointment.patientDni}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#64748B]" />
                    <p className="text-sm text-[#0F172A]">{selectedAppointment.patientPhone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#64748B]" />
                    <p className="text-sm text-[#0F172A]">{selectedAppointment.patientEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#2563EB]" />
                  Datos de la cita
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-[#64748B]">Área médica</p>
                    <p className="font-medium text-[#0F172A]">{selectedAppointment.area}</p>
                  </div>
                  {selectedAppointment.professional && (
                    <div>
                      <p className="text-sm text-[#64748B]">Médico asignado</p>
                      <p className="font-medium text-[#0F172A]">{selectedAppointment.professional}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <p className="text-sm text-[#0F172A]">{selectedAppointment.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#64748B]" />
                    <p className="text-sm text-[#0F172A]">{selectedAppointment.time}</p>
                  </div>
                  {selectedAppointment.reason && (
                    <div>
                      <p className="text-sm text-[#64748B] mb-1">Motivo de consulta</p>
                      <p className="text-sm text-[#0F172A]">{selectedAppointment.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <button
                  onClick={() => {
                    setShowDetails(false);
                    openValidate(selectedAppointment);
                  }}
                  className="w-full px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
                >
                  Validar cita
                </button>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    openReschedule(selectedAppointment);
                  }}
                  className="w-full px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
                >
                  Reprogramar
                </button>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    openCancel(selectedAppointment);
                  }}
                  className="w-full px-4 py-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors"
                >
                  Cancelar cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validate Dialog */}
      {showValidate && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Validar cita</h2>
            <p className="text-[#64748B] mb-6">
              ¿Confirmas que esta cita ha sido revisada y queda lista para la operación de recepción?
            </p>

            <div className="p-4 bg-[#F8FAFC] rounded-lg mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Paciente:</span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">DNI:</span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.patientDni}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Área:</span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Fecha:</span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Hora:</span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.time}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowValidate(false)}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleValidate}
                className="flex-1 px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
              >
                Validar cita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Dialog */}
      {showReschedule && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Reprogramar cita</h2>

            <div className="p-4 bg-[#F8FAFC] rounded-lg mb-6 space-y-2">
              <div>
                <span className="text-sm text-[#64748B]">Paciente: </span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.patientName}</span>
              </div>
              <div>
                <span className="text-sm text-[#64748B]">Fecha actual: </span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.date} • {selectedAppointment.time}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Nueva fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={rescheduleData.newDate}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Nuevo horario <span className="text-red-500">*</span>
                </label>
                <select
                  value={rescheduleData.newTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, newTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Seleccionar horario</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Motivo de reprogramación <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                  placeholder="Explica el motivo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Observación interna (opcional)
                </label>
                <textarea
                  value={rescheduleData.notes}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                  placeholder="Notas internas..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReschedule(false);
                  setRescheduleData({ newDate: '', newTime: '', reason: '', notes: '' });
                }}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReschedule}
                className="flex-1 px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
              >
                Guardar reprogramación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Dialog */}
      {showCancel && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Cancelar cita</h2>
                <p className="text-sm text-[#64748B]">
                  Esta acción cancelará la cita desde recepción. Debes registrar un motivo.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-lg mb-4">
              <p className="text-sm">
                <span className="text-[#64748B]">Cita: </span>
                <span className="font-medium text-[#0F172A]">{selectedAppointment.code}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Paciente: </span>
                <span className="font-medium text-[#0F172A]">{selectedAppointment.patientName}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Motivo de cancelación <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                placeholder="Describe el motivo de la cancelación..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancel(false);
                  setCancelReason('');
                }}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Confirmar cancelación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Dialog */}
      {showAttendance && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Registrar asistencia</h2>

            <div className="p-4 bg-[#F8FAFC] rounded-lg mb-6 space-y-2">
              <div>
                <span className="text-sm text-[#64748B]">Paciente: </span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.patientName}</span>
              </div>
              <div>
                <span className="text-sm text-[#64748B]">Área: </span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.area}</span>
              </div>
              <div>
                <span className="text-sm text-[#64748B]">Fecha: </span>
                <span className="text-sm font-medium text-[#0F172A]">{selectedAppointment.date} • {selectedAppointment.time}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-3">
                  Estado de asistencia
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                    <input
                      type="radio"
                      name="attendance"
                      value="attended"
                      checked={attendanceType === 'attended'}
                      onChange={() => setAttendanceType('attended')}
                      className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-[#0F172A]">Atendida</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-[#E2E8F0] rounded-lg cursor-pointer hover:bg-[#F8FAFC] transition-colors">
                    <input
                      type="radio"
                      name="attendance"
                      value="no-show"
                      checked={attendanceType === 'no-show'}
                      onChange={() => setAttendanceType('no-show')}
                      className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-[#0F172A]">No asistió</span>
                    </div>
                  </label>
                </div>
              </div>

              {attendanceType === 'no-show' && (
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Observación (opcional)
                  </label>
                  <textarea
                    value={attendanceNotes}
                    onChange={(e) => setAttendanceNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                    placeholder="Notas adicionales..."
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAttendance(false);
                  setAttendanceType('attended');
                  setAttendanceNotes('');
                }}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAttendance}
                className="flex-1 px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
              >
                Guardar estado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
