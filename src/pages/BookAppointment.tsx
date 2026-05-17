import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  Users,
  Bone,
  Brain,
  FlaskConical,
  Calendar,
  Clock,
  User,
  CheckCircle2
} from 'lucide-react';

const medicalAreas = [
  { name: 'Medicina General', icon: Stethoscope, color: 'blue' },
  { name: 'Cardiología', icon: Heart, color: 'red' },
  { name: 'Pediatría', icon: Baby, color: 'pink' },
  { name: 'Dermatología', icon: Sparkles, color: 'purple' },
  { name: 'Ginecología', icon: Users, color: 'teal' },
  { name: 'Traumatología', icon: Bone, color: 'orange' },
  { name: 'Psicología', icon: Brain, color: 'indigo' },
  { name: 'Laboratorio', icon: FlaskConical, color: 'cyan' },
];

const timeSlots = ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:30 PM'];

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState(location.state?.area || '');
  const [selectedDate, setSelectedDate] = useState(location.state?.date || new Date(2026, 4, 24));
  const [selectedTime, setSelectedTime] = useState(location.state?.time || '');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { number: 1, title: 'Área' },
    { number: 2, title: 'Fecha y horario' },
    { number: 3, title: 'Datos de cita' },
    { number: 4, title: 'Confirmación' },
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const confirmAppointment = () => {
    setShowSuccess(true);
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedArea !== '';
    if (currentStep === 2) return selectedDate && selectedTime !== '';
    if (currentStep === 3) return reason.trim() !== '';
    return true;
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
            Cita agendada correctamente
          </h2>
          <p className="text-[#64748B] mb-6">
            Tu cita ha sido registrada y aparecerá en Mis citas.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard/appointments')}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-3 rounded-lg font-medium transition-colors"
            >
              Ver mis citas
            </button>
            <button
              onClick={() => {
                setShowSuccess(false);
                setCurrentStep(1);
                setSelectedArea('');
                setSelectedDate(new Date());
                setSelectedTime('');
                setReason('');
              }}
              className="w-full border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] py-3 rounded-lg font-medium transition-colors"
            >
              Agendar otra cita
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Agendar Cita</h1>
        <p className="text-[#64748B]">
          Agenda tu cita en pocos pasos.
        </p>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep > step.number
                      ? 'bg-green-500 text-white'
                      : currentStep === step.number
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium hidden sm:block ${
                    currentStep >= step.number ? 'text-[#0F172A]' : 'text-[#64748B]'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 min-h-100">
        {/* Step 1: Select Area */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">
              Selecciona un área médica
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {medicalAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <button
                    key={area.name}
                    onClick={() => setSelectedArea(area.name)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      selectedArea === area.name
                        ? 'border-[#2563EB] bg-blue-50'
                        : 'border-[#E2E8F0] hover:border-[#2563EB]/50'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-3 text-${area.color}-600`} />
                    <h3 className="font-semibold text-[#0F172A]">{area.name}</h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Select Date and Time */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">
              Elige el horario que mejor se adapte a ti
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Fecha seleccionada
                </label>
                <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <Calendar className="w-5 h-5 text-[#2563EB]" />
                  <span className="font-medium text-[#0F172A]">
                    {selectedDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-3">
                  Selecciona un horario
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-[#2563EB] text-white ring-2 ring-[#2563EB] ring-offset-2'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#E2E8F0]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Appointment Details */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">
              Revisa y confirma tu cita
            </h2>
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <label className="text-sm text-[#64748B] mb-1 block">Área médica</label>
                  <p className="font-semibold text-[#0F172A]">{selectedArea}</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <label className="text-sm text-[#64748B] mb-1 block">Fecha y hora</label>
                  <p className="font-semibold text-[#0F172A]">
                    {selectedDate.toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    • {selectedTime}
                  </p>
                </div>
              </div>

              {/* Patient Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <label className="text-sm text-blue-900 font-medium mb-1 block">
                      Datos del paciente
                    </label>
                    <p className="text-sm text-blue-800">Mariana García López</p>
                    <p className="text-sm text-blue-700">DNI: 12345678</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Motivo de consulta
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">
              Revisa los datos antes de confirmar tu cita
            </h2>
            <div className="space-y-4">
              <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#64748B] mb-1 block">Área médica</label>
                    <p className="font-semibold text-[#0F172A] text-lg">{selectedArea}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-1 block">Fecha</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#2563EB]" />
                      <p className="font-semibold text-[#0F172A]">
                        {selectedDate.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-1 block">Hora</label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#2563EB]" />
                      <p className="font-semibold text-[#0F172A]">{selectedTime}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-1 block">Paciente</label>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-[#2563EB]" />
                      <p className="font-semibold text-[#0F172A]">Mariana García</p>
                    </div>
                  </div>
                </div>
                {reason && (
                  <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                    <label className="text-sm text-[#64748B] mb-1 block">Motivo de consulta</label>
                    <p className="text-[#0F172A]">{reason}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  Al confirmar tu cita, recibirás una notificación con los detalles de tu reserva.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver
        </button>

        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={confirmAppointment}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Confirmar cita
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
