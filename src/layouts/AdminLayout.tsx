import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  Activity,
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  UserCog,
  Clock,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  Search
} from 'lucide-react';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/appointments', icon: Calendar, label: 'Citas' },
  { path: '/admin/patients', icon: Users, label: 'Pacientes' },
  { path: '/admin/areas', icon: Stethoscope, label: 'Áreas médicas' },
  { path: '/admin/doctors', icon: UserCog, label: 'Médicos' },
  { path: '/admin/schedules', icon: Clock, label: 'Horarios' },
  { path: '/admin/settings', icon: Settings, label: 'Configuración' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Panel de recepción';
    if (path.includes('appointments')) return 'Gestión de citas';
    if (path.includes('patients')) return 'Pacientes';
    if (path.includes('areas')) return 'Áreas médicas';
    if (path.includes('doctors')) return 'Médicos';
    if (path.includes('schedules')) return 'Horarios';
    if (path.includes('settings')) return 'Configuración';
    return 'Panel administrativo';
  };

  const getPageDescription = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Gestiona las citas, horarios y pacientes de la clínica.';
    if (path.includes('appointments')) return 'Consulta y administra las citas generadas por los pacientes.';
    if (path.includes('patients')) return 'Busca y consulta información de pacientes registrados.';
    if (path.includes('areas')) return 'Administra las especialidades médicas disponibles.';
    if (path.includes('doctors')) return 'Gestiona los médicos como recursos operativos.';
    if (path.includes('schedules')) return 'Configura la disponibilidad de horarios por área y médico.';
    if (path.includes('settings')) return 'Configuración general del sistema.';
    return 'Sistema de gestión médica';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-[#E2E8F0]">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-[#E2E8F0]">
            <Activity className="w-8 h-8 text-[#2563EB]" />
            <div>
              <span className="text-xl font-bold text-[#0F172A]">ClinSync</span>
              <p className="text-xs text-[#64748B]">Panel Admin</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0891B2] flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#0F172A]">Admin ClinSync</p>
                <p className="text-sm text-[#64748B]">Recepción</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E2E8F0] transform transition-transform lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-[#2563EB]" />
              <div>
                <span className="text-xl font-bold text-[#0F172A]">ClinSync</span>
                <p className="text-xs text-[#64748B]">Panel Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-[#64748B]" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0891B2] flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="font-medium text-[#0F172A]">Admin ClinSync</p>
                <p className="text-sm text-[#64748B]">Recepción</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0]">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4 mb-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#64748B] hover:text-[#0F172A]"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Page Title */}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-[#0F172A]">{getPageTitle()}</h1>
                <p className="text-sm text-[#64748B] hidden sm:block">
                  {getPageDescription()}
                </p>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <Bell className="w-6 h-6 text-[#64748B]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Avatar (Desktop) */}
              <div className="hidden lg:block w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0891B2] flex items-center justify-center text-white font-semibold cursor-pointer">
                <div className="flex items-center justify-center w-full h-full">
                  A
                </div>
              </div>
            </div>

            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar paciente, cita o DNI..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}