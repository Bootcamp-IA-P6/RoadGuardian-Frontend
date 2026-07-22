// Cabecera visual de la página principal: mensaje de bienvenida + carretera ilustrada
export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-0 sm:pt-16">
      {/* Textura de grano y resplandor ámbar de fondo (definidos en index.css) */}
      <div className="hero-grain" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 34%, rgba(245,166,35,0.1), transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 border border-gray-800 bg-amber-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-amber-500">
          Visión por computador · Análisis de pavimento
        </span>

        <h2 className="font-display uppercase font-semibold mt-5 mb-3.5 text-[clamp(2rem,5vw,3.4rem)] leading-[1.06] text-concrete-50 text-balance">
          Sube una foto de la carretera.
          <br />
          Recibe el diagnóstico <span className="text-amber-500">al instante</span>.
        </h2>

        <p className="max-w-[46ch] mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
          RoadGuardian analiza el estado del asfalto, clasifica los daños encontrados y
          genera un informe técnico listo para descargar.
        </p>

        {/* Carretera en perspectiva con línea central y barrido de "escaneo" */}
        <div className="road mt-10 sm:mt-12">
          <div className="road-horizon" />
          <div className="road-surface" />
          <div className="road-centerline" />
          <div className="road-scan" />
        </div>
      </div>
    </section>
  );
}
