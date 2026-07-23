import { useState } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import DetectGrid from "../components/DetectGrid";
import ImageUploader from "../components/ImageUploader";
import DetectionCanvas from "../components/DetectionCanvas";
import ResultsTable from "../components/ResultsTable";
import PriorityBadge from "../components/PriorityBadge";
import { analyzeImage } from "../services/api";

// Página que solo analiza la imagen (llama a /analyze una única vez) y
// muestra el resultado en pantalla. La generación de PDF vive en su propia
// página (InformePdfPage) para no tener que repetir el análisis dos veces.
export default function AnalizarPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileSelected(selectedFile) {
    setLoading(true);
    setError(null);
    setResult(null);
    setImageUrl(URL.createObjectURL(selectedFile));

    try {
      const data = await analyzeImage(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Hero>
        Sube una foto de la carretera.
        <br />
        Recibe el diagnóstico <span className="text-amber-500">al instante</span>.
      </Hero>

      {/* La tarjeta de subida se solapa un poco con el hero, como en la maqueta aprobada */}
      <div className="relative -mt-8 sm:-mt-6 max-w-[40rem] mx-auto px-6 pb-2">
        <ImageUploader onFileSelected={handleFileSelected} isLoading={loading} />
      </div>

      <DetectGrid />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        {error && (
          <div className="mt-4 p-4 bg-red-950 border-l-4 border-red-600 text-red-300 font-mono text-sm">
            {error}
          </div>
        )}

        {result && imageUrl && (
          <div className="mt-8 space-y-6">
            <DetectionCanvas
              imageUrl={imageUrl}
              detections={result.detecciones}
              imgMeta={result.imagen}
            />
            <div className="flex items-center justify-between">
              <PriorityBadge level={result.veredicto.nivel_alerta} />
              <span className="font-mono text-xs text-gray-400 tracking-wider">
                {result.total_detecciones} INCIDENCIA(S) DETECTADA(S)
              </span>
            </div>
            <div className="bg-asphalt-700 border-t-2 border-amber-500 p-5">
              <h2 className="font-display uppercase tracking-wide text-concrete-50 mb-3">
                Resultados de detección
              </h2>
              <ResultsTable detections={result.detecciones} />
            </div>
            <div className="bg-asphalt-700 border-t-2 border-amber-500 p-5">
              <h2 className="font-display uppercase tracking-wide text-concrete-50 mb-2">
                Acción recomendada
              </h2>
              <p className="text-gray-300 text-sm">{result.veredicto.accion}</p>
              <p className="text-gray-500 text-sm mt-1">{result.veredicto.detalles}</p>
            </div>
            {result.informe && (
              <div className="bg-asphalt-700 border-t-2 border-amber-500 p-5">
                <h2 className="font-display uppercase tracking-wide text-concrete-50 mb-2">
                  Informe técnico
                </h2>
                <p className="text-gray-300 text-sm whitespace-pre-line">{result.informe}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
