// Tarjetas con los tipos de daño que el modelo es capaz de detectar hoy
export default function DetectGrid() {
  return (
    <section className="max-w-4xl mx-auto px-6 mt-14 sm:mt-20 mb-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap border-b border-gray-800 pb-3.5 mb-7">
        <h3 className="font-display uppercase tracking-wide text-lg text-concrete-50">
          Qué detecta el sistema
        </h3>
        <span className="font-mono text-[11px] tracking-wider text-gray-500 uppercase">
          3 categorías de daño · clasificación por gravedad
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 border border-gray-800 divide-y divide-gray-800 sm:divide-y-0 sm:divide-x">
        <div className="bg-asphalt-800 p-6 flex flex-col gap-3">
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-amber-500">
            <path
              d="M6 40L16 26L12 20L24 8L22 18L30 14L20 30L26 34L14 42"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <h4 className="font-display uppercase tracking-wide text-sm text-concrete-50">
            Grietas
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fisuras longitudinales, transversales y en piel de cocodrilo.
          </p>
        </div>

        <div className="bg-asphalt-800 p-6 flex flex-col gap-3">
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-amber-500">
            <path
              d="M24 8C31 8 38 14 40 22C38 30 31 36 24 36C17 36 10 30 8 22C10 14 17 8 24 8Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M18 20L24 26L30 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="font-display uppercase tracking-wide text-sm text-concrete-50">
            Baches
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Oquedades y pérdida de material en la superficie de rodadura.
          </p>
        </div>

        <div className="bg-asphalt-800 p-6 flex flex-col gap-3">
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-amber-500">
            <path
              d="M6 30C12 30 12 18 18 18C24 18 24 30 30 30C36 30 36 18 42 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="font-display uppercase tracking-wide text-sm text-concrete-50">
            Deformaciones
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Roderas, hundimientos y ondulaciones del firme.
          </p>
        </div>
      </div>
    </section>
  );
}
