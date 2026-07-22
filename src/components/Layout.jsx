export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-asphalt-900">
      <header className="bg-asphalt-900 border-b-4 border-amber-500 px-6 py-5">
        <h1 className="font-display uppercase tracking-wide text-2xl text-concrete-50">
          RoadGuardian <span className="text-amber-500">AI</span>
        </h1>
        <p className="font-mono text-xs text-gray-400 mt-1 tracking-wider">
          INSPECCIÓN AUTOMÁTICA DEL PAVIMENTO
        </p>
      </header>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}