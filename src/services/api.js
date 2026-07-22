const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Error al analizar la imagen");
  }

  return response.json();
}

export async function downloadReportPdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/analyze/pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Error al generar el informe PDF");
  }

  return response.blob();
}