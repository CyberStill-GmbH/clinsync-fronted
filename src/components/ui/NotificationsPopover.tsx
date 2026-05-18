import { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, CreditCard, Activity, CheckCircle } from 'lucide-react';

export type NotificationType = 'appointment' | 'payment' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case 'appointment':
      return <Calendar className="w-5 h-5 text-blue-500" />;
    case 'payment':
      return <CreditCard className="w-5 h-5 text-emerald-500" />;
    case 'system':
      return <Activity className="w-5 h-5 text-purple-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);

  const userStr = localStorage.getItem('clinsync_auth_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const storageKey = user ? `clinsync_notifications_${user.id}` : 'clinsync_notifications_guest';

  // Load notifications from localStorage or seed initial ones dynamically
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else if (user) {
      const isAdmin = user.role === 'ADMIN' || user.role === 'RECEPTIONIST';
      const initial: Notification[] = isAdmin
        ? [
            {
              id: '1',
              type: 'system',
              title: 'Panel Administrativo Listo',
              message: `¡Hola ${user.fullName || user.email.split('@')[0]}! El panel de control ClinSync está en línea y conectado a PostgreSQL.`,
              date: 'Hace un momento',
              read: false,
            },
            {
              id: '2',
              type: 'appointment',
              title: 'Sincronización Completa',
              message: 'Los módulos de citas y horarios están completamente sincronizados con la API backend.',
              date: 'Hace 10 minutos',
              read: true,
            },
          ]
        : [
            {
              id: '1',
              type: 'system',
              title: '¡Bienvenido a ClinSync!',
              message: `Hola ${user.firstName || 'Paciente'}, gracias por registrarte. Explora las especialidades médicas para reservar tu cita.`,
              date: 'Hace un momento',
              read: false,
            },
            {
              id: '2',
              type: 'appointment',
              title: 'Citas al Instante',
              message: 'Reserva tus citas con médicos especializados en tiempo real y recibe confirmación al instante.',
              date: 'Hace 5 minutos',
              read: true,
            },
          ];
      setNotifications(initial);
      localStorage.setItem(storageKey, JSON.stringify(initial));
    }
  }, [storageKey, userStr]);

  // Helper to save notifications
  const saveNotifications = (newNotifs: Notification[]) => {
    setNotifications(newNotifs);
    localStorage.setItem(storageKey, JSON.stringify(newNotifs));
  };

  // Listen for custom notification events from anywhere in the app
  useEffect(() => {
    const handleNewNotification = (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string; message: string; type: NotificationType }>;
      const { title, message, type } = customEvent.detail;
      const newNotif: Notification = {
        id: Date.now().toString(),
        type,
        title,
        message,
        date: 'Hace un momento',
        read: false,
      };
      saveNotifications([newNotif, ...notifications]);
    };

    window.addEventListener('clinsync_new_notification', handleNewNotification);
    return () => {
      window.removeEventListener('clinsync_new_notification', handleNewNotification);
    };
  }, [notifications, storageKey]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    saveNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    saveNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
      >
        <Bell className="w-6 h-6 text-[#64748B]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-50 overflow-hidden origin-top-right transition-all">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
              Notificaciones
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} nuevas
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" />
                Marcar todas leídas
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-[#E2E8F0]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 flex gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50/50' : 'bg-white'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'appointment' ? 'bg-blue-100' :
                        notification.type === 'payment' ? 'bg-emerald-100' : 'bg-purple-100'
                      }`}>
                        {getIconForType(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-sm font-semibold truncate ${
                          !notification.read ? 'text-[#0F172A]' : 'text-[#475569]'
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-sm text-[#64748B] line-clamp-2 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#94A3B8] font-medium">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-[#0F172A] font-medium">No hay notificaciones</p>
                <p className="text-sm text-[#64748B] mt-1">
                  Aquí aparecerán las novedades sobre tus citas y pagos.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
