import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Download, Eye, CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';

type InvoiceStatus = 'Pendiente' | 'Pagada' | 'Vencida';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  service: string;
  amount: number;
  status: InvoiceStatus;
}

const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    date: '24 May 2026',
    service: 'Consulta Cardiología',
    amount: 150,
    status: 'Pendiente',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-002',
    date: '20 May 2026',
    service: 'Análisis de Sangre',
    amount: 100,
    status: 'Pendiente',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-003',
    date: '14 May 2026',
    service: 'Consulta Traumatología',
    amount: 120,
    status: 'Pagada',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-004',
    date: '10 May 2026',
    service: 'Examen Oftalmológico',
    amount: 80,
    status: 'Pagada',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2026-005',
    date: '5 May 2026',
    service: 'Radiografía',
    amount: 90,
    status: 'Vencida',
  },
];

const getStatusBadge = (status: InvoiceStatus) => {
  const statusConfig = {
    'Pendiente': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
    'Pagada': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    'Vencida': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
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

export default function Invoices() {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const pendingTotal = invoices
    .filter((inv) => inv.status === 'Pendiente' || inv.status === 'Vencida')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidTotal = invoices
    .filter((inv) => inv.status === 'Pagada')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const lastInvoice = invoices[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Facturas</h1>
        <p className="text-[#64748B]">
          Consulta y gestiona tus facturas y comprobantes médicos.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Total pendiente</h3>
          <p className="text-3xl font-bold text-[#0F172A]">S/. {pendingTotal.toFixed(2)}</p>
          <p className="text-sm text-[#64748B] mt-1">
            {invoices.filter((inv) => inv.status === 'Pendiente' || inv.status === 'Vencida').length} facturas
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Total pagado</h3>
          <p className="text-3xl font-bold text-[#0F172A]">S/. {paidTotal.toFixed(2)}</p>
          <p className="text-sm text-[#64748B] mt-1">
            {invoices.filter((inv) => inv.status === 'Pagada').length} facturas
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-1">Última factura</h3>
          <p className="text-lg font-bold text-[#0F172A]">{lastInvoice.invoiceNumber}</p>
          <p className="text-sm text-[#64748B] mt-1">{lastInvoice.date}</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  N° Factura
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  Servicio
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  Monto
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{invoice.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{invoice.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0F172A]">S/. {invoice.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="p-2 hover:bg-[#E2E8F0] rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4 text-[#64748B]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#E2E8F0] rounded-lg transition-colors"
                        title="Descargar PDF"
                      >
                        <Download className="w-4 h-4 text-[#64748B]" />
                      </button>
                      {invoice.status === 'Pendiente' && (
                        <button
                          onClick={() => navigate('/dashboard/payments')}
                          className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          Pagar
                        </button>
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
        {invoices.map((invoice) => (
          <div key={invoice.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#0F172A] mb-1">{invoice.invoiceNumber}</h3>
                <p className="text-sm text-[#64748B]">{invoice.date}</p>
              </div>
              {getStatusBadge(invoice.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-xs text-[#64748B]">Servicio</p>
                <p className="text-sm font-medium text-[#0F172A]">{invoice.service}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Monto</p>
                <p className="text-lg font-bold text-[#0F172A]">S/. {invoice.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedInvoice(invoice)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg text-sm font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                Ver
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                PDF
              </button>
              {invoice.status === 'Pendiente' && (
                <button
                  onClick={() => navigate('/dashboard/payments')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  Pagar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">Detalle de Factura</h3>
                <p className="text-sm text-[#64748B]">{selectedInvoice.invoiceNumber}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-[#64748B] hover:text-[#0F172A] text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B] mb-1">Fecha</p>
                <p className="font-medium text-[#0F172A]">{selectedInvoice.date}</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B] mb-1">Servicio</p>
                <p className="font-medium text-[#0F172A]">{selectedInvoice.service}</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B] mb-1">Monto</p>
                <p className="text-2xl font-bold text-[#0F172A]">S/. {selectedInvoice.amount.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B] mb-2">Estado</p>
                {getStatusBadge(selectedInvoice.status)}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {invoices.length === 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-2">
            Aún no tienes facturas registradas
          </h3>
          <p className="text-sm text-[#64748B]">
            Tus facturas aparecerán aquí después de tu primera consulta.
          </p>
        </div>
      )}
    </div>
  );
}
