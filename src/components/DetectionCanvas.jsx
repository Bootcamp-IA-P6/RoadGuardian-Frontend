import { useRef, useEffect, useState } from "react";

const CLASS_COLORS = {
  pothole: "#ef4444",
  longitudinal_crack: "#3b82f6",
  transverse_crack: "#8b5cf6",
  alligator_crack: "#f59e0b",
};

export default function DetectionCanvas({ imageUrl, detections, imgMeta }) {
  const containerRef = useRef(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const width = containerRef.current.offsetWidth;
      setDisplaySize({
        width,
        height: width * (imgMeta.height / imgMeta.width),
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [imgMeta]);

  const scaleX = displaySize.width / imgMeta.width;
  const scaleY = displaySize.height / imgMeta.height;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden border-2 border-amber-500">
      <img src={imageUrl} alt="Análisis de pavimento" className="w-full block" />
      {displaySize.width > 0 && (
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox={`0 0 ${displaySize.width} ${displaySize.height}`}
        >
          {detections.map((det, i) => {
            const x = det.bbox.x1 * scaleX;
            const y = det.bbox.y1 * scaleY;
            const w = (det.bbox.x2 - det.bbox.x1) * scaleX;
            const h = (det.bbox.y2 - det.bbox.y1) * scaleY;
            const color = CLASS_COLORS[det.clase] || "#6b7280";
            return (
              <g key={i}>
                <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="3" rx="2" />
                <rect x={x} y={Math.max(y - 20, 0)} width={Math.max(w, 90)} height="20" fill={color} />
                <text x={x + 4} y={Math.max(y - 5, 15)} fill="white" fontSize="12" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
                  {det.clase} {(det.confianza * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}