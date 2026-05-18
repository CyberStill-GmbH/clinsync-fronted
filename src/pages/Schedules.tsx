import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Calendar, ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { useAreas } from '@/features/areas/api/area.hooks';
import { useSchedulesByArea } from '@/features/schedules/api/schedule.hooks';
import { appConfig } from '@/app/config';

export default function Schedules() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAreaFromState = location.state?.selectedArea;

  const { data: areas = [] } = useAreas();
  const displayedAreas = areas.length > 0 ? areas : [
    { id: '1', name: 'Medicina General' },
    { id: '2', name: 'Cardiología' },
    { id: '3', name: 'Pediatría' },
    { id: '4', name: 'Dermatología' },
    { id: '5', name: 'Ginecología' },
    { id: '6', name: 'Traumatología' },
    { id: '7', name: 'Psicología' },
    { id: '8', name: 'Laboratorio' },
  ];

  const [selectedArea, setSelectedArea] = useState(selectedAreaFromState || displayedAreas[0].name);
  const [selectedDate, setSelectedDate] = useState(location.state?.date || new Date(2026, 4, 20)); // May 20, 2026
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedScheduleId, setSelectedScheduleId] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentAreaObj = areas.find(a => a.name === selectedArea);
  const areaId = currentAreaObj?.id !== undefined ? String(currentAreaObj.id) : '';
  const { data: schedules = [] } = useSchedulesByArea(areaId);

  const activeDateString = selectedDate.toISOString().split('T')[0];
  const activeSchedules = schedules.filter(s => s.date === activeDateString);

  const mockTimeSlots = [
    { id: 'm1', time: '08:00 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm2', time: '08:30 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm3', time: '09:00 AM', available: false },
    { id: 'm4', time: '09:30 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm5', time: '10:00 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm6', time: '10:30 AM', available: false },
    { id: 'm7', time: '11:00 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm8', time: '11:30 AM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm9', time: '02:00 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm10', time: '02:30 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm11', time: '03:00 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm12', time: '03:30 PM', available: false },
    { id: 'm13', time: '04:00 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm14', time: '04:30 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm15', time: '05:00 PM', available: true, doctor: 'Dr. Carlos Méndez' },
    { id: 'm16', time: '05:30 PM', available: false },
  ];

  const slotsToRender = appConfig.useMocks 
    ? mockTimeSlots 
    : activeSchedules.map(s => ({
        id: s.id,
        time: `${s.startTime} - ${s.endTime}`,
        available: s.status === 'Disponible',
        doctor: s.doctor,
      }));

  const handleContinue = () => {
    if (selectedTime) {
      navigate('/dashboard/book', {
        state: {
          area: selectedArea,
          date: selectedDate,
          time: selectedTime,
          scheduleId: selectedScheduleId,
          doctor: selectedDoctor,
        },
      });
    }
  };

  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatMonth = () => {
    return selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const previousMonth = () => {
    handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Consultar Horarios</h1>
        <p className="text-[#64748B]">
          Selecciona un área médica, fecha y horario para tu consulta.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-[#0F172A] mb-2">
              Área médica
            </label>
            <select
              id="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            >
              {displayedAreas.map((area) => (
                <option key={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
              Selecciona una fecha
            </h2>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#64748B]" />
            </button>
            <span className="font-semibold text-[#0F172A] capitalize">
              {formatMonth()}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-[#64748B] py-2">
                {day}
              </div>
            ))}
            {getDaysInMonth().map((date, index) => (
              <button
                key={index}
                onClick={() => date && handleDateChange(date)}
                disabled={!date}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all
                  ${!date ? 'invisible' : ''}
                  ${isToday(date) ? 'border-2 border-[#2563EB]' : ''}
                  ${
                    isSelectedDate(date)
                      ? 'bg-[#2563EB] text-white'
                      : 'hover:bg-[#F8FAFC] text-[#0F172A]'
                  }
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">
            Horarios disponibles
          </h2>
          <p className="text-sm text-[#64748B] mb-4">
            {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-[#F8FAFC] rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-96 overflow-y-auto">
                {slotsToRender.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => {
                      if (slot.available) {
                        setSelectedTime(slot.time);
                        setSelectedScheduleId(slot.id);
                        setSelectedDoctor(slot.doctor || '');
                      }
                    }}
                    disabled={!slot.available}
                    className={`
                      py-3 px-4 rounded-lg font-medium text-sm transition-all flex flex-col items-center justify-center gap-1
                      ${
                        selectedTime === slot.time
                          ? 'bg-[#2563EB] text-white ring-2 ring-[#2563EB] ring-offset-2'
                          : slot.available
                          ? 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#E2E8F0]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1 font-semibold">
                      {slot.time}
                      {selectedTime === slot.time && <Check className="w-4 h-4" />}
                    </div>
                    {slot.doctor && (
                      <div className={`text-[11px] ${selectedTime === slot.time ? 'text-blue-100' : 'text-gray-500'}`}>
                        {slot.doctor}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {slotsToRender.length === 0 || slotsToRender.every((slot) => !slot.available) ? (
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      No hay horarios disponibles para esta fecha
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Prueba con otro día o selecciona una fecha diferente.
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Legend */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E2E8F0] text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#F8FAFC] border border-[#E2E8F0]"></div>
                  <span className="text-[#64748B]">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#2563EB]"></div>
                  <span className="text-[#64748B]">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100"></div>
                  <span className="text-[#64748B]">No disponible</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedTime}
          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Continuar con la cita
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
