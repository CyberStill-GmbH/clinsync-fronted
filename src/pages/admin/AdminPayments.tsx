import { CreditCard } from 'lucide-react';

export default function AdminPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Pagos (Admin)</h1>
        <p className="text-[#64748B]">
          Gestión de pagos y transacciones de la clínica.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-semibold text-[#0F172A] mb-2">
          Módulo en desarrollo
        </h3>
        <p className="text-sm text-[#64748B]">
          Próximamente podrás administrar todos los pagos desde aquí.
        </p>
      </div>
    </div>
  );
}
