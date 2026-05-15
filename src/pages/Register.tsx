import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, User, Mail, Lock, Phone, MapPin, Calendar, Users } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    district: '',
    emergencyContact: '',
    emergencyPhone: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'Campo requerido';
    if (!formData.lastName) newErrors.lastName = 'Campo requerido';
    if (!formData.dni) newErrors.dni = 'Campo requerido';
    else if (formData.dni.length !== 8) newErrors.dni = 'Debe tener 8 dígitos';
    if (!formData.birthDate) newErrors.birthDate = 'Campo requerido';
    if (!formData.gender) newErrors.gender = 'Campo requerido';
    if (!formData.phone) newErrors.phone = 'Campo requerido';
    else if (formData.phone.length !== 9) newErrors.phone = 'Debe tener 9 dígitos';
    if (!formData.email) newErrors.email = 'Campo requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Campo requerido';
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos';
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar el tratamiento de datos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-[#2563EB] mb-4">
            <Activity className="w-8 h-8" />
            <span className="text-2xl font-bold">ClinSync</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
            Crear cuenta de paciente
          </h1>
          <p className="text-[#64748B]">
            Regístrate para agendar y gestionar tus citas médicas en línea.
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8">
          <p className="text-sm text-[#64748B] mb-6 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
            Podrás agendar citas, revisar horarios, consultar tus facturas y gestionar tus métodos de pago.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#2563EB]" />
                Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Nombres <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                  {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="dni" className="block text-sm font-medium text-[#0F172A] mb-2">
                    DNI <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    maxLength={8}
                    value={formData.dni}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="Ingresa 8 dígitos"
                  />
                  {errors.dni && <p className="text-sm text-red-500 mt-1">{errors.dni}</p>}
                </div>

                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Fecha de nacimiento <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>
                  {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Sexo / Género <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  >
                    <option value="">Seleccionar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="O">Otro</option>
                  </select>
                  {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Teléfono celular <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength={9}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                      placeholder="Ejemplo: 987654321"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#2563EB]" />
                Información de Cuenta
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">Mínimo 8 caracteres</p>
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Optional Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2563EB]" />
                Información Adicional (Opcional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Dirección
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Distrito
                  </label>
                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="flex text-sm font-medium text-[#0F172A] mb-2 items-center gap-1">
                    <Users className="w-4 h-4" />
                    Contacto de emergencia
                  </label>
                  <input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-[#0F172A] mb-2">
                    Teléfono de emergencia
                  </label>
                  <input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    maxLength={9}
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    placeholder="Ejemplo: 987654321"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-[#64748B]">
                  Acepto los <button type="button" className="text-[#2563EB] hover:underline">términos y condiciones</button>
                </span>
              </label>
              {errors.acceptTerms && <p className="text-sm text-red-500 ml-6">{errors.acceptTerms}</p>}

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-[#64748B]">
                  Acepto el <button type="button" className="text-[#2563EB] hover:underline">tratamiento de mis datos personales</button>
                </span>
              </label>
              {errors.acceptPrivacy && <p className="text-sm text-red-500 ml-6">{errors.acceptPrivacy}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-medium py-3 rounded-lg transition-colors"
              >
                Ya tengo una cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}