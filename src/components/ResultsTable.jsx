export default function ResultsTable({ detections }) {
  return (
    <table className="w-full text-sm text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-600 text-gray-400 font-mono text-xs uppercase tracking-wider">
          <th className="py-2 pr-4">Tipo de daño</th>
          <th className="py-2 pr-4">Confianza</th>
          <th className="py-2 pr-4">% Superficie</th>
        </tr>
      </thead>
      <tbody>
        {detections.map((det, i) => (
          <tr key={i} className="border-b border-gray-700">
            <td className="py-2 pr-4 font-medium capitalize text-concrete-50">
              {det.clase.replace(/_/g, " ")}
            </td>
            <td className="py-2 pr-4 font-mono text-amber-500">
              {(det.confianza * 100).toFixed(0)}%
            </td>
            <td className="py-2 pr-4 font-mono text-gray-300">
              {det.superficie_pct.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}