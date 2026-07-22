const PRIORITY_STYLES = {
  alta: "bg-red-600 text-white",
  media: "bg-amber-500 text-asphalt-900",
  baja: "bg-green-600 text-white",
};

export default function PriorityBadge({ level }) {
  const normalized = (level || "").toLowerCase();
  const style = PRIORITY_STYLES[normalized] || "bg-gray-500 text-white";

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 font-display uppercase tracking-wide text-sm ${style}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)" }}
    >
      ⚠ Prioridad {level}
    </span>
  );
}