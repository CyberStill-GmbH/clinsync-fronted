import { useState } from 'react';
import { Plus, X, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminSchedules, useCreateSchedule } from '../../features/schedules/api/schedule.hooks';
import { useAreas } from '../../features/areas/api/area.hooks';
import { useAdminDoctors } from '../../features/doctors/api/doctor.hooks';
import { appConfig } from '../../app/config';

interface Schedule {
  id: string;
  area: string;
  doctor?: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  assignedAppointments: number;
}

const mockSchedules: Schedule[] = [
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

export default function AdminSchedules() {
  const { data: dbSchedules = [] } = useAdminSchedules();
  const { data: areas = [] } = useAreas();
  const { data: dbDoctors = [] } = useAdminDoctors();
  const createScheduleMutation = useCreateSchedule();

  const schedules = (dbSchedules.length > 0 ? dbSchedules : mockSchedules).map((s: any) => {
    const areaName = typeof s.area === 'object' && s.area ? s.area.name : s.area;
    const docName = typeof s.doctor === 'object' && s.doctor ? s.doctor.fullName : s.doctor;
    const dateStr = s.date instanceof Date 
      ? s.date.toISOString().split('T')[0] 
      : (typeof s.date === 'string' && s.date.includes('T') ? s.date.split('T')[0] : s.date);
    const apptsCount = Array.isArray(s.appointments) ? s.appointments.length : (s.assignedAppointments || 0);

    return {
      id: s.id,
      area: areaName || 'Especialidad',
      doctor: docName || 'No asignado',
      date: dateStr,
      startTime: s.startTime,
      endTime: s.endTime,
      status: s.status,
      assignedAppointments: apptsCount,
    };
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    doctor: '',
    date: '',
    startTime: '',
    endTime: '',
    isAvailable: true,
  });
  const [filterArea, setFilterArea] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const openForm = () => {
    setFormData({
      area: '',
      doctor: '',
      date: '',
      startTime: '',
      endTime: '',
      isAvailable: true,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      area: '',
      doctor: '',
      date: '',
      startTime: '',
      endTime: '',
      isAvailable: true,
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.area || !formData.date || !formData.startTime || !formData.endTime) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    if (appConfig.useMocks) {
      toast.success('Horario creado correctamente');
      closeForm();
      return;
    }

    try {
      const selectedAreaObj = areas.find(a => a.name === formData.area);
      if (!selectedAreaObj) {
        toast.error('Especialidad no válida');
        return;
      }

      await createScheduleMutation.mutateAsync({
        areaId: selectedAreaObj.id,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        doctorId: formData.doctor || undefined,
      });

      toast.success('Horario creado correctamente');
      closeForm();
    } catch (err: any) {
      toast.error(err.message || 'Error al crear el horario');
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      'Disponible': { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
      'AVAILABLE': { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
      'Ocupado': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Ocupado' },
      'OCCUPIED': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Ocupado' },
      'Inactivo': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Inactivo' },
      'INACTIVE': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Inactivo' },
    };

    const style = config[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };



  return (
    <div className="space-y-6">
      {/* Header Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Horarios</h2>
          <p className="text-[#64748B]">Configura la disponibilidad por área y médico</p>
        </div>
        <button
          onClick={openForm}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear horario
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#64748B]" />
          <h3 className="font-semibold text-[#0F172A]">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Área médica
            </label>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Todas las áreas</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Traumatología">Traumatología</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Pediatría">Pediatría</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="flex items-end">
            {(filterArea || filterDate) && (
              <button
                onClick={() => {
                  setFilterArea('');
                  setFilterDate('');
                }}
                className="w-full px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] rounded-lg text-sm font-medium transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Área</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Médico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Hora inicio</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Hora fin</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Citas asignadas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{schedule.area}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{schedule.doctor || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{schedule.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{schedule.startTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{schedule.endTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(schedule.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{schedule.assignedAppointments}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#0F172A] mb-1">{schedule.area}</h3>
                <p className="text-sm text-[#64748B]">{schedule.doctor || 'Sin médico asignado'}</p>
              </div>
              {getStatusBadge(schedule.status)}
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-[#64748B]">Fecha:</span>{' '}
                <span className="text-[#0F172A] font-medium">{schedule.date}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Horario:</span>{' '}
                <span className="text-[#0F172A]">{schedule.startTime} - {schedule.endTime}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Citas:</span>{' '}
                <span className="text-[#0F172A] font-medium">{schedule.assignedAppointments}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">Crear horario</h2>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Área médica <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Seleccionar área</option>
                  {appConfig.useMocks ? (
                    <>
                      <option value="Medicina General">Medicina General</option>
                      <option value="Cardiología">Cardiología</option>
                      <option value="Pediatría">Pediatría</option>
                      <option value="Dermatología">Dermatología</option>
                      <option value="Traumatología">Traumatología</option>
                    </>
                  ) : (
                    areas.map((area: any) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Médico (opcional)
                </label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Sin médico específico</option>
                  {appConfig.useMocks ? (
                    <>
                      <option value="Dr. Carlos Méndez">Dr. Carlos Méndez</option>
                      <option value="Dra. Ana Torres">Dra. Ana Torres</option>
                      <option value="Dr. Roberto Silva">Dr. Roberto Silva</option>
                    </>
                  ) : (
                    dbDoctors.map((doc: any) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.fullName} ({doc.area?.name || 'Médico'})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Hora inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Hora fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-[#0F172A]">
                  Estado disponible
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeForm}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
              >
                Crear horario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}