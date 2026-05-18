import { useState, useEffect } from 'react';
import { Plus, Edit, Power, X, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminDoctors } from '../../features/doctors/api/doctor.hooks';
import type { Doctor } from '../../features/doctors/types/doctor.types';

export default function AdminDoctors() {
  const { data: fetchedDoctors = [] } = useAdminDoctors();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (fetchedDoctors.length > 0) {
      setDoctors(fetchedDoctors);
    }
  }, [fetchedDoctors]);

  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    document: '',
    phone: '',
    email: '',
    medicalArea: '',
    isActive: true,
  });

  const openForm = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        fullName: doctor.fullName,
        document: doctor.document || '',
        phone: doctor.phone,
        email: doctor.email,
        medicalArea: doctor.medicalArea,
        isActive: doctor.isActive,
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        fullName: '',
        document: '',
        phone: '',
        email: '',
        medicalArea: '',
        isActive: true,
      });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingDoctor(null);
    setFormData({
      fullName: '',
      document: '',
      phone: '',
      email: '',
      medicalArea: '',
      isActive: true,
    });
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.medicalArea) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    if (editingDoctor) {
      toast.success('Médico actualizado correctamente');
    } else {
      toast.success('Médico registrado correctamente');
    }
    closeForm();
  };

  const toggleDoctorStatus = (doctorId: string) => {
    setDoctors(doctors.map(doctor =>
      doctor.id === doctorId ? { ...doctor, isActive: !doctor.isActive } : doctor
    ));
    toast.success('Estado actualizado');
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <UserCog className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Sobre el registro de médicos</h3>
            <p className="text-sm text-blue-800">
              Los médicos registrados aquí se usan únicamente para organizar horarios y citas. No tendrán acceso al sistema en esta versión.
            </p>
          </div>
        </div>
      </div>

      {/* Header Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Médicos</h2>
          <p className="text-[#64748B]">Gestiona los médicos como recursos operativos</p>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Registrar médico
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Nombre completo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Área médica</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Documento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Teléfono</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Correo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{doctor.fullName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{doctor.medicalArea}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{doctor.document || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{doctor.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{doctor.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {doctor.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openForm(doctor)}
                        className="p-2 hover:bg-[#E2E8F0] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-[#64748B]" />
                      </button>
                      <button
                        onClick={() => toggleDoctorStatus(doctor.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          doctor.isActive
                            ? 'hover:bg-red-50 text-red-600'
                            : 'hover:bg-green-50 text-green-600'
                        }`}
                        title={doctor.isActive ? 'Desactivar' : 'Activar'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
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
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#0F172A] mb-1">{doctor.fullName}</h3>
                <p className="text-sm text-[#64748B]">{doctor.medicalArea}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {doctor.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-[#64748B]">{doctor.email}</p>
              <p className="text-sm text-[#64748B]">{doctor.phone}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openForm(doctor)}
                className="flex-1 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => toggleDoctorStatus(doctor.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  doctor.isActive
                    ? 'border border-red-200 hover:bg-red-50 text-red-600'
                    : 'border border-green-200 hover:bg-green-50 text-green-600'
                }`}
              >
                {doctor.isActive ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {editingDoctor ? 'Editar médico' : 'Registrar médico'}
              </h2>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="Dr./Dra. Nombre Apellido"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Documento (CMP, DNI, etc.)
                </label>
                <input
                  type="text"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="Opcional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="987654321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Correo <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="medico@clinsync.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Área médica <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.medicalArea}
                  onChange={(e) => setFormData({ ...formData, medicalArea: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Seleccionar área</option>
                  <option value="Medicina General">Medicina General</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Traumatología">Traumatología</option>
                  <option value="Ginecología">Ginecología</option>
                  <option value="Psicología">Psicología</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="doctorActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <label htmlFor="doctorActive" className="text-sm font-medium text-[#0F172A]">
                  Médico activo
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeForm}
                className="flex-1 px-4 py-3 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
              >
                {editingDoctor ? 'Actualizar' : 'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
