import { useNavigate } from 'react-router';
import {
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  Users,
  Bone,
  Brain,
  FlaskConical,
  Clock,
  ArrowRight
} from 'lucide-react';

const medicalAreas = [
  {
    id: 1,
    name: 'Medicina General',
    icon: Stethoscope,
    description: 'Consultas médicas generales para diagnóstico y tratamiento.',
    availableSlots: 12,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    name: 'Cardiología',
    icon: Heart,
    description: 'Especialidad en enfermedades del corazón y sistema cardiovascular.',
    availableSlots: 8,
    color: 'red',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 3,
    name: 'Pediatría',
    icon: Baby,
    description: 'Atención médica especializada para bebés, niños y adolescentes.',
    availableSlots: 15,
    color: 'pink',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 4,
    name: 'Dermatología',
    icon: Sparkles,
    description: 'Tratamiento de enfermedades de la piel, cabello y uñas.',
    availableSlots: 6,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 5,
    name: 'Ginecología',
    icon: Users,
    description: 'Salud reproductiva y atención integral para la mujer.',
    availableSlots: 10,
    color: 'teal',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-700',
  },
  {
    id: 6,
    name: 'Traumatología',
    icon: Bone,
    description: 'Tratamiento de lesiones del sistema musculoesquelético.',
    availableSlots: 7,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 7,
    name: 'Psicología',
    icon: Brain,
    description: 'Apoyo profesional para salud mental y bienestar emocional.',
    availableSlots: 9,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 8,
    name: 'Laboratorio',
    icon: FlaskConical,
    description: 'Análisis clínicos y estudios de laboratorio.',
    availableSlots: 20,
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    badgeColor: 'bg-cyan-100 text-cyan-700',
  },
];

export default function MedicalAreas() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Áreas Médicas</h1>
        <p className="text-[#64748B]">
          Selecciona un área médica para consultar horarios disponibles.
        </p>
      </div>

      {/* Medical Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {medicalAreas.map((area) => {
          const Icon = area.icon;
          return (
            <div
              key={area.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate('/dashboard/schedules', { state: { selectedArea: area.name } })}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${area.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${area.iconColor}`} />
              </div>

              {/* Area Name */}
              <h3 className="font-bold text-[#0F172A] mb-2 text-lg">{area.name}</h3>

              {/* Description */}
              <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                {area.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Clock className="w-4 h-4" />
                  <span>{area.availableSlots} horarios</span>
                </div>

                {area.availableSlots > 0 && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${area.badgeColor}`}>
                    Disponible
                  </span>
                )}
              </div>

              {/* Hover Button */}
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[#2563EB] text-white py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Ver horarios
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-[#0F172A] mb-2">
              ¿Necesitas ayuda para elegir un área?
            </h3>
            <p className="text-sm text-[#64748B] mb-3">
              Si no estás seguro de qué especialidad médica necesitas, te recomendamos comenzar con Medicina General. Nuestros médicos generales pueden evaluar tu caso y derivarte al especialista adecuado si es necesario.
            </p>
            <button
              onClick={() => navigate('/dashboard/schedules', { state: { selectedArea: 'Medicina General' } })}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Agendar consulta de Medicina General →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
