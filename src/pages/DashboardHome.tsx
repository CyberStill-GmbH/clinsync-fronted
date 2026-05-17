import { useNavigate } from 'react-router';
import {
  Calendar,
  Clock,
  FileText,
  CreditCard,
  CalendarPlus,
  Stethoscope,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Próxima Cita Card */}
      <div className="bg-linear-to-br from-[#2563EB] to-[#0891B2] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Próxima cita</p>
            <h2 className="text-2xl font-bold">Cardiología</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Confirmada
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Viernes, 24 de mayo</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>10:30 AM</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard/appointments')}
          className="bg-white text-[#2563EB] hover:bg-white/90 px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          Ver detalle
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Citas Pendientes */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#2563EB]" />
            </div>
            <span className="text-2xl font-bold text-[#0F172A]">3</span>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Citas pendientes</h3>
          <p className="text-sm text-[#64748B]">Este mes</p>
        </div>

        {/* Facturas Pendientes */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-2xl font-bold text-[#0F172A]">S/. 250</span>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Facturas pendientes</h3>
          <p className="text-sm text-[#64748B]">1 factura por pagar</p>
        </div>

        {/* Método de Pago */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#16A34A]" />
            </div>
            <span className="text-xs font-medium text-[#16A34A] bg-green-50 px-2 py-1 rounded-full">
              Activo
            </span>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Método de pago</h3>
          <p className="text-sm text-[#64748B]">Visa •••• 4532</p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/dashboard/book')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors">
              <CalendarPlus className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Agendar nueva cita</h3>
            <p className="text-sm text-[#64748B]">Reserva tu próxima consulta</p>
          </button>

          <button
            onClick={() => navigate('/dashboard/schedules')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2] transition-colors">
              <Clock className="w-6 h-6 text-[#0891B2] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Ver horarios</h3>
            <p className="text-sm text-[#64748B]">Consulta disponibilidad</p>
          </button>

          <button
            onClick={() => navigate('/dashboard/invoices')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-4 group-hover:bg-[#F59E0B] transition-colors">
              <FileText className="w-6 h-6 text-[#F59E0B] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Ver facturas</h3>
            <p className="text-sm text-[#64748B]">Consulta tus pagos</p>
          </button>

          <button
            onClick={() => navigate('/dashboard/payments')}
            className="bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-left transition-all hover:shadow-md group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#16A34A]/10 flex items-center justify-center mb-4 group-hover:bg-[#16A34A] transition-colors">
              <CreditCard className="w-6 h-6 text-[#16A34A] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-1">Agregar tarjeta</h3>
            <p className="text-sm text-[#64748B]">Gestiona tus métodos de pago</p>
          </button>
        </div>
      </div>

      {/* Próximas Citas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Próximas citas</h2>
          <button
            onClick={() => navigate('/dashboard/appointments')}
            className="text-sm text-[#2563EB] hover:underline font-medium"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-3">
          {/* Cita 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A]">Cardiología</h3>
                <p className="text-sm text-[#64748B]">Viernes, 24 de mayo • 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Confirmada
              </span>
              <button
                onClick={() => navigate('/dashboard/appointments')}
                className="text-[#2563EB] hover:text-[#1d4ed8]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cita 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A]">Dermatología</h3>
                <p className="text-sm text-[#64748B]">Lunes, 27 de mayo • 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Pendiente
              </span>
              <button
                onClick={() => navigate('/dashboard/appointments')}
                className="text-[#2563EB] hover:text-[#1d4ed8]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cita 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A]">Medicina General</h3>
                <p className="text-sm text-[#64748B]">Jueves, 30 de mayo • 11:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Pendiente
              </span>
              <button
                onClick={() => navigate('/dashboard/appointments')}
                className="text-[#2563EB] hover:text-[#1d4ed8]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
