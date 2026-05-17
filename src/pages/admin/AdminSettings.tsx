import { Building2, Settings2, Users, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Configuración</h2>
        <p className="text-[#64748B]">Configuración general del sistema</p>
      </div>

      {/* Clinic Information */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">Datos de la clínica</h3>
            <p className="text-sm text-[#64748B]">Información general de la clínica ficticia</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Nombre de la clínica
            </label>
            <input
              type="text"
              defaultValue="ClinSync Medical Center"
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                RUC
              </label>
              <input
                type="text"
                defaultValue="20123456789"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Teléfono
              </label>
              <input
                type="text"
                defaultValue="+51 987 654 321"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Dirección
            </label>
            <input
              type="text"
              defaultValue="Av. Salud 123, Miraflores, Lima"
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Correo de contacto
            </label>
            <input
              type="email"
              defaultValue="contacto@clinsync.com"
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      </div>

      {/* Appointment Preferences */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <Settings2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">Preferencias de agenda</h3>
            <p className="text-sm text-[#64748B]">Configuración de citas y horarios</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Duración predeterminada de cita (minutos)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Días máximos de anticipación
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-sm text-[#0F172A]">
                Permitir agendamiento el mismo día
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-sm text-[#0F172A]">
                Enviar notificaciones automáticas
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-sm text-[#0F172A]">
                Requerir validación de recepción para todas las citas
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Appointment States */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">Estados de cita</h3>
            <p className="text-sm text-[#64748B]">Estados disponibles en el sistema</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Pendiente</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Confirmada</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Validada por recepción</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Reprogramada</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Atendida</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">No asistió</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
            <span className="text-sm text-[#0F172A]">Cancelada por recepción</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Activo
            </span>
          </div>
        </div>
      </div>

      {/* Administrative Users */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">Usuarios administrativos</h3>
            <p className="text-sm text-[#64748B]">Configuración básica de usuarios del sistema</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
            <div>
              <p className="font-medium text-[#0F172A]">Admin ClinSync</p>
              <p className="text-sm text-[#64748B]">admin@clinsync.com</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Administrador
            </span>
          </div>
          <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
            <div>
              <p className="font-medium text-[#0F172A]">Recepción Principal</p>
              <p className="text-sm text-[#64748B]">recepcion@clinsync.com</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Recepcionista
            </span>
          </div>
        </div>

        <p className="text-xs text-[#64748B] mt-4 p-3 bg-[#F8FAFC] rounded-lg">
          Configuración completa de usuarios disponible en versiones futuras.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}