import { useState, useMemo } from 'react';
import { Search, User, Phone, Mail, Calendar, X, Eye } from 'lucide-react';
import { useAdminPatients } from '../../features/patients/api/patient.hooks';
import type { Patient } from '../../features/patients/types/patient.types';

export default function AdminPatients() {
  const { data: allPatients = [] } = useAdminPatients();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPatients = useMemo(() => {
    return allPatients.filter(patient => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        patient.fullName.toLowerCase().includes(query) ||
        patient.dni.includes(query) ||
        patient.phone.includes(query) ||
        patient.email.toLowerCase().includes(query)
      );
    });
  }, [allPatients, searchQuery]);

  const openDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-semibold text-[#0F172A] mb-4">Buscar paciente</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, DNI, teléfono o correo..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Paciente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Teléfono</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Correo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Última cita</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Total de citas</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{patient.fullName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{patient.dni}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{patient.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{patient.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#0F172A]">{patient.lastAppointment}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{patient.totalAppointments}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openDetails(patient)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h3 className="font-bold text-[#0F172A] mb-4">{patient.fullName}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="text-[#64748B]">DNI:</span>{' '}
                <span className="text-[#0F172A] font-medium">{patient.dni}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Teléfono:</span>{' '}
                <span className="text-[#0F172A]">{patient.phone}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#64748B]">Total de citas:</span>{' '}
                <span className="text-[#0F172A] font-medium">{patient.totalAppointments}</span>
              </p>
            </div>
            <button
              onClick={() => openDetails(patient)}
              className="w-full px-4 py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
            >
              Ver perfil
            </button>
          </div>
        ))}
      </div>

      {/* Patient Details Sheet */}
      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div
            className="absolute inset-0"
            onClick={() => setShowDetails(false)}
          />
          <div className="relative w-full max-w-lg h-full bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">Perfil del paciente</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0891B2] flex items-center justify-center text-white text-2xl font-bold">
                  {selectedPatient.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{selectedPatient.fullName}</h3>
                  <p className="text-sm text-[#64748B]">DNI: {selectedPatient.dni}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-[#0F172A] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2563EB]" />
                  Información personal
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#0F172A]">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#0F172A]">{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#0F172A]">
                      Nacimiento: {selectedPatient.birthDate}
                    </span>
                  </div>
                </div>
              </div>

              {(selectedPatient.address || selectedPatient.district) && (
                <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                  <h4 className="font-semibold text-[#0F172A]">Dirección</h4>
                  {selectedPatient.address && (
                    <p className="text-sm text-[#0F172A]">{selectedPatient.address}</p>
                  )}
                  {selectedPatient.district && (
                    <p className="text-sm text-[#64748B]">Distrito: {selectedPatient.district}</p>
                  )}
                </div>
              )}

              {(selectedPatient.emergencyContact || selectedPatient.emergencyPhone) && (
                <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                  <h4 className="font-semibold text-[#0F172A]">Contacto de emergencia</h4>
                  {selectedPatient.emergencyContact && (
                    <p className="text-sm text-[#0F172A]">{selectedPatient.emergencyContact}</p>
                  )}
                  {selectedPatient.emergencyPhone && (
                    <p className="text-sm text-[#64748B]">{selectedPatient.emergencyPhone}</p>
                  )}
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                <h4 className="font-semibold text-[#0F172A]">Historial de citas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F8FAFC] rounded-lg">
                    <p className="text-xs text-[#64748B] mb-1">Total de citas</p>
                    <p className="text-2xl font-bold text-[#0F172A]">{selectedPatient.totalAppointments}</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg">
                    <p className="text-xs text-[#64748B] mb-1">Última cita</p>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedPatient.lastAppointment}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {/* Navigate to appointments filtered by this patient */}}
                  className="w-full px-4 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg font-medium transition-colors"
                >
                  Ver todas las citas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
