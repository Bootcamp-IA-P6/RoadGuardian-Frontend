import { NavLink } from "react-router-dom";

// Clases de las pestañas de navegación según estén activas o no
function tabClass({ isActive }) {
  return [
    "font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition",
    isActive
      ? "border-amber-500 text-amber-500 bg-amber-500/10"
      : "border-gray-800 text-gray-400 hover:text-gray-200",
  ].join(" ");
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-asphalt-900">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-asphalt-900 border-b border-gray-800 px-6 py-5">
        <div className="flex items-center gap-3">
          {/* Icono de marca: triángulo de aviso, coherente con el acento ámbar */}
          <svg viewBox="0 0 34 34" fill="none" className="w-8 h-8 flex-shrink-0">
            <path
              d="M4 27 L14 6 L20 6 L30 27"
              stroke="#F5A623"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M17 12 L17 19" stroke="#F5A623" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="17" cy="23.5" r="1.4" fill="#F5A623" />
          </svg>
          <div>
            <h1 className="font-display uppercase tracking-wide text-2xl text-concrete-50">
              RoadGuardian <span className="text-amber-500">AI</span>
            </h1>
            <p className="font-mono text-xs text-gray-400 mt-1 tracking-wider">
              INSPECCIÓN AUTOMÁTICA DEL PAVIMENTO
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-gray-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" />
          Backend conectado
        </div>
      </header>

      {/* Navegación entre las dos páginas: analizar en pantalla o generar el PDF directamente */}
      <nav className="flex gap-2 px-6 pt-5">
        <NavLink to="/" end className={tabClass}>
          Analizar
        </NavLink>
        <NavLink to="/informe-pdf" className={tabClass}>
          Generar PDF
        </NavLink>
      </nav>

      <main>{children}</main>
    </div>
  );
}