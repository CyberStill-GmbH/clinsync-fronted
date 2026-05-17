# Arquitectura Frontend - ClinSync

Este documento describe la arquitectura, stack tecnológico y convenciones del proyecto frontend **ClinSync**. La aplicación ha sido diseñada con un enfoque modular, escalable y mantenible, utilizando las mejores prácticas de desarrollo web moderno.

## 🛠 Stack Tecnológico

El ecosistema principal del proyecto está compuesto por las siguientes tecnologías:

- **Core:** React 19 + TypeScript
- **Build Tool & Bundler:** Vite 8
- **Enrutamiento:** React Router 7 (`createBrowserRouter`)
- **Estilos:** TailwindCSS 4 + `tw-animate-css`
- **Tipografía:** Geist Font (`@fontsource-variable/geist`)
- **Iconografía:** Lucide React
- **Data Fetching & Estado Asíncrono:** TanStack React Query v5 + Axios
- **Componentes UI (Base Shadcn):** Radix UI, `class-variance-authority`, `clsx`, `tailwind-merge`
- **Linting:** ESLint + TypeScript ESLint

---

## 📁 Estructura de Directorios

La estructura de carpetas en `src/` sigue un patrón híbrido inspirado en *Feature-Sliced Design* (FSD) combinado con convenciones clásicas de React, optimizado para escalar.

```text
src/
├── assets/       # Recursos estáticos (imágenes, fuentes locales, SVGs)
├── components/   # Componentes compartidos
│   └── ui/       # Componentes atómicos/reusables (ej. NotificationsPopover, Botones)
├── config/       # Configuración global (ej. env.ts, configuración de Axios)
├── features/     # Módulos aislados por dominio de negocio (actualmente preparado para escala)
├── guards/       # Componentes de orden superior (HOC) para proteger rutas (ej. AuthGuard)
├── layouts/      # Estructuras maestras de interfaz (ej. DashboardLayout)
├── lib/          # Utilidades puras y funciones helper (ej. utils.ts para cn())
├── pages/        # Componentes de nivel de ruta (Vistas principales)
├── services/     # Lógica de comunicación externa
│   ├── api/      # Clientes Axios y endpoints
│   └── storage/  # Manejo de persistencia local (LocalStorage, Cookies)
├── styles/       # Archivos globales de CSS (App.css, Tailwind, utilidades)
├── App.tsx       # Definición declarativa de todas las rutas (Router Config)
└── main.tsx      # Punto de entrada de la aplicación (Montaje del DOM)
```

---

## 🏗 Patrones Arquitectónicos Clave

### 1. Sistema de Enrutamiento (React Router v7)
La aplicación utiliza un enfoque declarativo de enrutamiento centralizado en `App.tsx` mediante `createBrowserRouter`. 
- **Rutas Anidadas (Nested Routing):** El layout principal (`DashboardLayout`) actúa como contenedor padre de las vistas internas, renderizando el contenido a través del componente `<Outlet />`. Esto evita re-renderizados innecesarios del *sidebar* y el *header*.
- **Manejo de 404:** Componente fallback `NotFound` mapeado en la ruta comodín `*`.

### 2. Gestión del Estado Asíncrono
En lugar de manejar llamadas a API manualmente con `useEffect` y `useState`, el proyecto incluye **TanStack React Query** (`@tanstack/react-query`).
- **Beneficios:** Caché inteligente, invalidación automática de consultas, reintentos y soporte nativo para *Optimistic Updates* (ideal para acciones rápidas como marcar notificaciones como leídas).

### 3. Sistema de Componentes UI (Design System)
El diseño se basa en clases de utilidad a través de **Tailwind CSS v4** y componentes sin estilo de **Radix UI** (patrón Shadcn).
- **`lib/utils.ts`:** Provee la función utilitaria `cn` (fusión de `clsx` y `tailwind-merge`) que permite construir y sobreescribir clases de Tailwind de forma dinámica y condicional sin colisiones de cascada.
- Todos los componentes atómicos puros (como Popovers, Inputs, Modales) deben vivir estrictamente bajo `src/components/ui/`.

### 4. Escalabilidad Orientada a "Features"
Aunque las páginas actúan como punto de entrada, la arquitectura introduce el directorio `features/`. Conforme el proyecto crezca (ej. módulo completo de facturación avanzada), la lógica, los hooks específicos, el estado y los componentes de ese dominio deben empaquetarse dentro de su propia carpeta en `features/`, evitando un acoplamiento masivo en los directorios globales.

### 5. Control de Acceso (Guards)
El directorio `guards/` está reservado para la implementación de protección de rutas (ej. validar si un token de autenticación sigue vigente antes de renderizar un `<Outlet />` protegido).

---

## 📝 Buenas Prácticas y Convenciones

1. **Inmutabilidad y Tipado Estricto:** Obligación de usar interfaces o *types* en cada componente (como en el popover de notificaciones) para garantizar inferencia estática por parte de TypeScript.
2. **Separación de Responsabilidades:** `pages/` no debe contener lógica de negocio densa; debe limitarse a invocar *Custom Hooks*, obtener *queries* de React Query, y agrupar componentes de `features/` o `components/`.
3. **Manejo de Iconografía:** Uso exclusivo de `lucide-react`. Si un ícono se repite, se debe modularizar.
4. **Mocking y Transición a Backend:** Todo componente nuevo en etapa de desarrollo que dependa de datos externos debe usar arreglos de *mocking* claramente delimitados (ej. `mockNotifications`) y acompañados de un comentario explicativo que describa los pasos exactos para su futura integración con la API real.
