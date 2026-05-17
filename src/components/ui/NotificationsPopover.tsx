import { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, CreditCard, Activity, CheckCircle } from 'lucide-react';

/* 
  INSTRUCCIONES PARA EL FUTURO (Integración Real):
  1. Reemplazar `mockNotifications` con un estado `notifications` alimentado por un custom hook (ej: `useNotifications()`).
  2. Implementar WebSockets (ej: Socket.io, SignalR) o Polling para recibir notificaciones en tiempo real desde el backend.
  3. Al hacer clic en "Marcar todas como leídas", disparar una mutación a la API (ej: `PUT /api/notifications/read-all`) y actualizar el estado local.
  4. Al hacer clic en una notificación individual, enviarla al backend para marcarla como leída y navegar a la ruta correspondiente si tiene una.
*/

export type NotificationType = 'appointment' | 'payment' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Cita Confirmada',
    message: 'Tu cita para Cardiología el 24 de Mayo ha sido confirmada.',
    date: 'Hace 2 horas',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Pago Recibido',
    message: 'Hemos procesado el pago de S/. 120 por tu consulta.',
    date: 'Hace 5 horas',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Bienvenido a ClinSync',
    message: 'Completa tu perfil para aprovechar al máximo la plataforma.',
    date: 'Hace 2 días',
    read: true,
  },
];

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
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
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
