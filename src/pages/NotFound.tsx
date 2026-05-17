import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#2563EB] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
            Página no encontrada
          </h2>
          <p className="text-[#64748B]">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#E2E8F0] hover:bg-white text-[#0F172A] rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
