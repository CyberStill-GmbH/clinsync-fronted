import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { NotificationsPopover } from '../components/ui/NotificationsPopover';
import { Logo } from '../components/ui/Logo';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  Home,
  CalendarPlus,
  Stethoscope,
  Clock,
  Calendar,
  FileText,
  CreditCard,
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: Home, label: 'Inicio' },
  { path: '/dashboard/book', icon: CalendarPlus, label: 'Agendar cita' },
  { path: '/dashboard/areas', icon: Stethoscope, label: 'Áreas médicas' },
  { path: '/dashboard/schedules', icon: Clock, label: 'Horarios' },
  { path: '/dashboard/appointments', icon: Calendar, label: 'Mis citas' },
  { path: '/dashboard/invoices', icon: FileText, label: 'Facturas' },
  { path: '/dashboard/payments', icon: CreditCard, label: 'Pagos' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-[#E2E8F0]">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="p-6 border-b border-[#E2E8F0]">
            <Logo />
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
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0891B2] flex items-center justify-center text-white font-semibold">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-[#0F172A]">{user?.name || user?.email?.split('@')[0] || 'Paciente'}</p>
                <p className="text-sm text-[#64748B]">Ver perfil</p>
              </div>
            </button>
            {userMenuOpen && (
              <div className="mt-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Cerrar sesión</span>
                </button>
              </div>
            )}
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
            <Logo />
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
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#0F172A]">{user?.name || user?.email?.split('@')[0] || 'Paciente'}</p>
                <p className="text-sm text-[#64748B]">Paciente</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
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
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Mobile Menu Button & Greeting */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#64748B] hover:text-[#0F172A]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#0F172A]">Hola, {user?.name || user?.email?.split('@')[0] || 'Paciente'}</h1>
                <p className="text-sm text-[#64748B] hidden sm:block">
                  Gestiona tus citas y pagos desde tu portal.
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard/book')}
                className="hidden sm:flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <CalendarPlus className="w-5 h-5" />
                Nueva cita
              </button>

              {/* Notifications */}
              <NotificationsPopover />


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
