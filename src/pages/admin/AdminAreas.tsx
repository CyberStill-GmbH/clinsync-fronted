import { useState, useEffect } from 'react';
import { Plus, Edit, Power, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAreas } from '../../features/areas/api/area.hooks';

interface MedicalArea {
  id: string | number;
  name: string;
  description: string;
  isActive?: boolean;
  associatedDoctors?: number;
  availableSchedules?: number;
}

export default function AdminAreas() {
  const { data: fetchedAreas = [] } = useAdminAreas();
  const [areas, setAreas] = useState<MedicalArea[]>([]);

  useEffect(() => {
    if (fetchedAreas.length > 0) {
      setAreas(fetchedAreas as MedicalArea[]);
    }
  }, [fetchedAreas]);

  const [showForm, setShowForm] = useState(false);
  const [editingArea, setEditingArea] = useState<MedicalArea | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  const openForm = (area?: MedicalArea) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        name: area.name,
        description: area.description,
        isActive: area.isActive ?? true,
      });
    } else {
      setEditingArea(null);
      setFormData({
        name: '',
        description: '',
        isActive: true,
      });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingArea(null);
    setFormData({
      name: '',
      description: '',
      isActive: true,
    });
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    if (editingArea) {
      toast.success('Área médica actualizada correctamente');
    } else {
      toast.success('Área médica creada correctamente');
    }
    closeForm();
  };

  const toggleAreaStatus = (areaId: string | number) => {
    setAreas(areas.map(area =>
      area.id === areaId ? { ...area, isActive: !area.isActive } : area
    ));
    toast.success('Estado actualizado');
  };

  return (
    <div className="space-y-6">
      {/* Header Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Áreas médicas</h2>
          <p className="text-[#64748B]">Administra las especialidades disponibles para agendamiento</p>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva área
        </button>
      </div>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area) => (
          <div
            key={area.id}
            className={`bg-white border rounded-2xl p-6 transition-all ${
              area.isActive
                ? 'border-[#E2E8F0] hover:shadow-md'
                : 'border-gray-300 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0F172A]">{area.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  area.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {area.isActive ? 'Activa' : 'Inactiva'}
              </span>
            </div>

            <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
              {area.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-[#E2E8F0]">
              <div>
                <p className="text-xs text-[#64748B] mb-1">Médicos</p>
                <p className="text-lg font-bold text-[#0F172A]">{area.associatedDoctors}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B] mb-1">Horarios</p>
                <p className="text-lg font-bold text-[#0F172A]">{area.availableSchedules}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openForm(area)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-lg text-sm font-medium transition-colors"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => toggleAreaStatus(area.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  area.isActive
                    ? 'border border-red-200 hover:bg-red-50 text-red-600'
                    : 'border border-green-200 hover:bg-green-50 text-green-600'
                }`}
              >
                <Power className="w-4 h-4" />
                {area.isActive ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {editingArea ? 'Editar área médica' : 'Nueva área médica'}
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
                  Nombre del área <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="Ej: Medicina General"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                  placeholder="Describe el área médica..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-[#0F172A]">
                  Área activa
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
                {editingArea ? 'Actualizar' : 'Crear'} área
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}