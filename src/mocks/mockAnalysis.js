export const mockAnalysis = {
  filename: "carretera_ejemplo.jpg",
  imagen: { width: 1024, height: 768 },
  total_detecciones: 3,
  detecciones: [
    { clase: "pothole", confianza: 0.89, superficie_pct: 4.2,
      bbox: { x1: 180, y1: 320, x2: 340, y2: 460 } },
    { clase: "longitudinal_crack", confianza: 0.74, superficie_pct: 1.8,
      bbox: { x1: 420, y1: 100, x2: 620, y2: 140 } },
    { clase: "alligator_crack", confianza: 0.81, superficie_pct: 6.5,
      bbox: { x1: 600, y1: 450, x2: 850, y2: 620 } },
  ],
  veredicto: {
    nivel_alerta: "alta",
    accion: "Reparación prioritaria en las próximas 2 semanas",
    detalles: "Se detectó un bache de tamaño considerable junto con grietas activas.",
  },
  informe: "Durante la inspección automática se identificaron 3 incidencias relevantes en el tramo analizado. El daño más significativo corresponde a un bache de aproximadamente 4.2% de la superficie visible. Se recomienda priorizar la intervención en este tramo.",
  informe_error: null,
};