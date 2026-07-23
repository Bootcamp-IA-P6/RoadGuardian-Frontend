// Renderizador ligero del informe del LLM. No es un parser de markdown
// completo: cubre justo lo que el prompt del backend produce (cabeceras ##,
// negritas/cursivas y listas), igual que hace reports/pdf.py en el backend.
// Traer react-markdown entero sería pagar mucho por un subconjunto conocido.

// Convierte **negrita** y *cursiva* de una línea en nodos React.
function inline(texto) {
  const partes = [];
  const regex = /\*\*(.+?)\*\*|\*([^*]+?)\*/g;
  let ultimo = 0;
  let match;
  let clave = 0;

  while ((match = regex.exec(texto)) !== null) {
    if (match.index > ultimo) {
      partes.push(texto.slice(ultimo, match.index));
    }
    if (match[1] !== undefined) {
      partes.push(
        <strong key={clave++} className="font-semibold text-concrete-50">
          {match[1]}
        </strong>
      );
    } else {
      partes.push(
        <em key={clave++} className="italic">
          {match[2]}
        </em>
      );
    }
    ultimo = regex.lastIndex;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

export default function InformeTecnico({ texto }) {
  if (!texto) return null;

  const bloques = [];
  let parrafo = [];
  let vinetas = [];
  let clave = 0;

  const cerrarParrafo = () => {
    if (parrafo.length) {
      bloques.push(
        <p key={clave++} className="text-gray-300 text-sm leading-relaxed">
          {inline(parrafo.join(" "))}
        </p>
      );
      parrafo = [];
    }
  };

  const cerrarLista = () => {
    if (vinetas.length) {
      bloques.push(
        <ul key={clave++} className="list-disc list-outside pl-5 space-y-1 text-gray-300 text-sm leading-relaxed">
          {vinetas.map((v, i) => (
            <li key={i}>{inline(v)}</li>
          ))}
        </ul>
      );
      vinetas = [];
    }
  };

  for (const linea of texto.split("\n")) {
    const limpia = linea.trim();

    if (!limpia) {
      cerrarParrafo();
      cerrarLista();
      continue;
    }

    if (limpia.startsWith("#")) {
      cerrarParrafo();
      cerrarLista();
      const titulo = limpia.replace(/^#+\s*/, "");
      bloques.push(
        <h3
          key={clave++}
          className="font-display uppercase tracking-wide text-amber-500 text-sm mt-5 first:mt-0 pb-1 border-b border-gray-700"
        >
          {inline(titulo)}
        </h3>
      );
      continue;
    }

    if (/^[-*•]\s+/.test(limpia) || /^\d+\.\s+/.test(limpia)) {
      cerrarParrafo();
      vinetas.push(limpia.replace(/^[-*•]\s+|^\d+\.\s+/, ""));
      continue;
    }

    cerrarLista();
    parrafo.push(limpia);
  }

  cerrarParrafo();
  cerrarLista();

  return <div className="space-y-3">{bloques}</div>;
}
