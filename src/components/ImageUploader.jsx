import { useRef, useState } from "react";
import CameraCapture from "./CameraCapture";

export default function ImageUploader({ onFileSelected, isLoading }) {
  const inputRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div
      className="relative bg-asphalt-800 border border-gray-800 shadow-2xl shadow-black/50 p-8 sm:p-11 text-center cursor-pointer group"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) onFileSelected(file);
      }}
    >
      <span className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500 group-hover:w-10 group-hover:h-10 transition-all" />
      <span className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500 group-hover:w-10 group-hover:h-10 transition-all" />
      <span className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500 group-hover:w-10 group-hover:h-10 transition-all" />
      <span className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500 group-hover:w-10 group-hover:h-10 transition-all" />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFileSelected(e.target.files[0])}
      />

      {showCamera && (
        <CameraCapture
          onCapture={onFileSelected}
          onClose={() => setShowCamera(false)}
        />
      )}

      {isLoading ? (
        <p className="font-mono text-amber-500 text-sm tracking-wider animate-pulse">
          escaneando imagen...
        </p>
      ) : (
        <>
          {/* Icono de subida */}
          <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 mx-auto mb-3.5 text-amber-500">
            <path
              d="M24 30V10M24 10L16 18M24 10L32 18"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 30V36C8 37.6569 9.34315 39 11 39H37C38.6569 39 40 37.6569 40 36V30"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>

          <p className="font-body text-concrete-50 text-base">
            Arrastra una foto del pavimento aquí
          </p>
          <p className="font-mono text-gray-500 text-xs mt-2 tracking-wider">
            o haz clic para seleccionar un archivo
          </p>

          {/* Botón dedicado: dispara el input con capture para abrir la cámara */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowCamera(true);
            }}
            className="inline-flex items-center gap-2 mt-4 font-mono text-xs tracking-wider text-amber-500 border border-amber-500/60 px-4 py-2 hover:bg-amber-500 hover:text-asphalt-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Tomar foto
          </button>

          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <span className="font-mono text-[11px] tracking-wider text-gray-500">
              JPG · PNG · HEIC
            </span>
            <span className="font-mono text-[11px] tracking-wider text-gray-500 border border-dashed border-gray-700 px-2 py-0.5">
              Vídeo — próximamente
            </span>
          </div>
        </>
      )}
    </div>
  );
}