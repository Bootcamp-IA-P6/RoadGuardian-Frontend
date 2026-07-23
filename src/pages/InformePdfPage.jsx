import { useState } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import DetectGrid from "../components/DetectGrid";
import ImageUploader from "../components/ImageUploader";
import { downloadReportPdf } from "../services/api";

// Página que llama directamente a /analyze/pdf: el modelo se ejecuta una
// única vez y el resultado (el PDF) se descarga en el momento, sin pasar
// antes por la vista de resultados en pantalla.
export default function InformePdfPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  async function handleFileSelected(file) {
    setLoading(true);
    setError(null);
    setDownloaded(false);

    try {
      const blob = await downloadReportPdf(file);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "informe_roadguardian.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Hero
        eyebrow="Informe técnico · Descarga directa"
        description="Sube una foto y descarga el informe en PDF con el diagnóstico completo, sin necesidad de revisarlo antes en pantalla."
      >
        Sube una foto de la carretera.
        <br />
        Descarga el informe <span className="text-amber-500">en PDF</span>.
      </Hero>

      <div className="relative -mt-8 sm:-mt-6 max-w-[40rem] mx-auto px-6 pb-2">
        <ImageUploader onFileSelected={handleFileSelected} isLoading={loading} />
      </div>

      <div className="max-w-[40rem] mx-auto px-6 pb-2">
        {error && (
          <div className="mt-4 p-4 bg-red-950 border-l-4 border-red-600 text-red-300 font-mono text-sm">
            {error}
          </div>
        )}

        {downloaded && !loading && !error && (
          <div className="mt-4 p-4 bg-asphalt-800 border-l-4 border-amber-500 text-gray-300 font-mono text-sm">
            ✅ Informe generado y descargado.
          </div>
        )}
      </div>

      <DetectGrid />
    </Layout>
  );
}
