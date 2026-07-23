import { useEffect, useRef, useState } from "react";

/**
 * Modal de captura por webcam/cámara. Usa getUserMedia, así que funciona
 * igual en PC (webcam) que en móvil (cámara trasera). Al capturar, dibuja el
 * frame actual en un canvas y lo entrega como File JPEG a onCapture.
 *
 * Requiere contexto seguro (HTTPS o localhost) para acceder a la cámara.
 */
export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function iniciar() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          // Preferimos la trasera en móvil; en PC coge la webcam disponible.
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setReady(true);
      } catch {
        setError(
          "No se pudo acceder a la cámara. Revisa los permisos del navegador o usa 'seleccionar archivo'."
        );
      }
    }

    iniciar();
    return () => {
      cancelled = true;
      // Apagar la cámara al cerrar: sin esto el LED sigue encendido.
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function tomarFoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `captura-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        onCapture(file);
        onClose();
      },
      "image/jpeg",
      0.92
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-asphalt-800 border border-gray-800 shadow-2xl shadow-black/50 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <span className="font-mono text-amber-500 text-xs tracking-wider uppercase">
            Cámara en vivo
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-concrete-50 text-xl leading-none"
            aria-label="Cerrar cámara"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {error ? (
            <p className="font-body text-red-400 text-sm text-center py-8">
              {error}
            </p>
          ) : (
            <div className="relative bg-black aspect-video overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!ready && (
                <p className="absolute inset-0 flex items-center justify-center font-mono text-amber-500 text-sm animate-pulse">
                  activando cámara...
                </p>
              )}
            </div>
          )}
        </div>

        {!error && (
          <div className="flex justify-center gap-3 px-4 pb-4">
            <button
              type="button"
              onClick={tomarFoto}
              disabled={!ready}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-asphalt-800 bg-amber-500 px-6 py-2.5 hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
              Capturar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs tracking-wider text-gray-400 border border-gray-700 px-6 py-2.5 hover:text-concrete-50 hover:border-gray-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
