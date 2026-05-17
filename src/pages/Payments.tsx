import { useState } from 'react';
import { CreditCard, Plus, Check, Lock, Calendar, DollarSign, CheckCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  brand: string;
  lastDigits: string;
  holder: string;
  expiry: string;
  isPrimary: boolean;
}

interface PaymentHistory {
  id: string;
  date: string;
  concept: string;
  amount: number;
  status: string;
  method: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    brand: 'Visa',
    lastDigits: '4532',
    holder: 'UNI',
    expiry: '12/28',
    isPrimary: true,
  },
];

const paymentHistory: PaymentHistory[] = [
  {
    id: '1',
    date: '14 May 2026',
    concept: 'Consulta Traumatología',
    amount: 120,
    status: 'Completado',
    method: 'Visa •••• 4532',
  },
  {
    id: '2',
    date: '10 May 2026',
    concept: 'Examen Oftalmológico',
    amount: 80,
    status: 'Completado',
    method: 'Visa •••• 4532',
  },
  {
    id: '3',
    date: '5 May 2026',
    concept: 'Radiografía',
    amount: 90,
    status: 'Completado',
    method: 'Visa •••• 4532',
  },
];

export default function Payments() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardData({ ...cardData, expiry: value });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardData({ ...cardData, cvv: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowAddCard(false);
        setCardData({
          cardNumber: '',
          cardHolder: '',
          expiry: '',
          cvv: '',
          billingAddress: '',
        });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Pagos y Métodos de Pago</h1>
        <p className="text-[#64748B]">
          Gestiona tus métodos de pago y consulta tu historial de transacciones.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Tus datos de pago se procesan de forma segura
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Utilizamos encriptación de nivel bancario para proteger tu información.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0F172A]">Métodos de pago</h2>
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Agregar tarjeta
          </button>
        </div>

        {/* Current Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-gradient-to-br from-[#2563EB] to-[#0891B2] rounded-2xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <CreditCard className="w-10 h-10" />
                  {method.isPrimary && (
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      Principal
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-xs mb-1">Número de tarjeta</p>
                    <p className="text-xl font-semibold tracking-wider">
                      •••• •••• •••• {method.lastDigits}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-xs mb-1">Titular</p>
                      <p className="font-medium">{method.holder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs mb-1">Vencimiento</p>
                      <p className="font-medium">{method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-sm font-semibold">{method.brand}</span>
                    <button className="text-sm text-white/90 hover:text-white hover:underline">
                      Cambiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Card Form */}
        {showAddCard && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 mb-6">
            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Tarjeta agregada exitosamente
                </h3>
                <p className="text-[#64748B]">
                  Tu nuevo método de pago está listo para usar
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#0F172A]">Agregar nueva tarjeta</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="text-[#64748B] hover:text-[#0F172A] text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Número de tarjeta
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="cardNumber"
                      type="text"
                      value={cardData.cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Nombre del titular
                  </label>
                  <input
                    id="cardHolder"
                    type="text"
                    value={cardData.cardHolder}
                    onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent uppercase"
                    placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-[#0F172A] mb-2">
                      Fecha de vencimiento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                      <input
                        id="expiry"
                        type="text"
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-[#0F172A] mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                      <input
                        id="cvv"
                        type="text"
                        value={cardData.cvv}
                        onChange={handleCvvChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Dirección de facturación (Opcional)
                  </label>
                  <input
                    id="billingAddress"
                    type="text"
                    value={cardData.billingAddress}
                    onChange={(e) => setCardData({ ...cardData, billingAddress: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 px-6 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Agregar tarjeta
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Historial de pagos</h2>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Concepto
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Monto
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
                    Método
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[#64748B]">{payment.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#0F172A]">{payment.concept}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#0F172A] inline-flex items-center"><DollarSign className="w-4 h-4 text-[#64748B] mr-1" /> {payment.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#64748B]">{payment.method}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#0F172A] mb-1">{payment.concept}</h3>
                  <p className="text-sm text-[#64748B]">{payment.date}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  {payment.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div>
                  <p className="text-xs text-[#64748B] mb-1">Monto</p>
                  <p className="text-lg font-bold text-[#0F172A] inline-flex items-center"><DollarSign className="w-5 h-5 text-[#64748B] mr-1" /> {payment.amount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#64748B] mb-1">Método</p>
                  <p className="text-sm text-[#0F172A]">{payment.method}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State for Payment Methods */}
      {paymentMethods.length === 0 && !showAddCard && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-[#0F172A] mb-2">
            Agrega un método de pago para agilizar tus próximas atenciones
          </h3>
          <p className="text-sm text-[#64748B] mb-4">
            Podrás pagar tus consultas de forma rápida y segura.
          </p>
          <button
            onClick={() => setShowAddCard(true)}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Agregar tarjeta
          </button>
        </div>
      )}
    </div>
  );
}
