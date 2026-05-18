import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useLogin } from "../features/auth/api/auth.hooks";
import { appConfig } from "../app/config";
import { getRedirectPathByRole } from "../features/auth/utils/auth-redirect";
import type { AuthSession } from "../features/auth/types/auth.types";

export default function Login() {
    const navigate = useNavigate();
    const { login: authenticate } = useAuth();
    const loginMutation = useLogin();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("Por favor ingresa tus credenciales");
            return;
        }

        setError('');
        setIsLoading(true);

        if (appConfig.useMocks) {
            setTimeout(() => {
                setIsLoading(false);
                let role: "ADMIN" | "RECEPTIONIST" | "PATIENT" = "PATIENT";
                let fullName = "Mariana García López";
                if (email.toLowerCase().includes("admin")) {
                    role = "ADMIN";
                    fullName = "Administrador ClinSync";
                } else if (email.toLowerCase().includes("recepcion")) {
                    role = "RECEPTIONIST";
                    fullName = "Recepcionista ClinSync";
                }

                const mockSession: AuthSession = {
                    token: "mock-jwt-token-xyz",
                    user: {
                        id: "mock-user-123",
                        email: email.toLowerCase(),
                        role,
                        name: fullName,
                    }
                };

                authenticate(mockSession);
                const redirectPath = getRedirectPathByRole(role);
                navigate(redirectPath);
            }, 1000);
        } else {
            try {
                const session = await loginMutation.mutateAsync({
                    email: email.trim(),
                    password: password.trim(),
                });
                setIsLoading(false);
                const redirectPath = getRedirectPathByRole(session.user.role);
                navigate(redirectPath);
            } catch (err: any) {
                setIsLoading(false);
                setError(err.response?.data?.message || err.message || "Credenciales incorrectas");
            }
        }
    };

    return (
    <div className="min-h-screen flex">
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#2563EB] via-[#0891B2] to-[#0891B2] p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="mb-8">
            <Logo textClassName="text-2xl text-white" iconClassName="brightness-0 invert" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Sistema inteligente de gestión de citas médicas
          </h1>
          <p className="text-lg text-white/90">
            Agenda tus citas, consulta tus horarios y gestiona tus pagos de forma rápida y segura.
          </p>
        </div>

        {/* Hero Illustration */}
        <div className="absolute bottom-8 right-8 z-10 pointer-events-none">
          <img 
            src="/about.svg" 
            alt="Ilustración médica" 
            className="w-72 lg:w-96 object-contain drop-shadow-2xl opacity-90"
          />
        </div>

        {/* Abstract Medical Visual */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <Logo textClassName="text-2xl" />
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                Bienvenido de nuevo
              </h2>
              <p className="text-[#64748B]">
                Accede a tu portal para gestionar tus citas médicas.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#0F172A]"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#0F172A]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-sm text-[#64748B]">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[#2563EB] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#64748B]">o</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-[#64748B] mb-3">
                ¿Aún no tienes cuenta?
              </p>
              <button
                onClick={() => navigate('/register')}
                className="w-full border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-medium py-3 rounded-lg transition-colors"
              >
                Crear cuenta de paciente
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-6 text-xs text-center text-[#64748B]">
              Tus datos están protegidos bajo estándares de privacidad médica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
