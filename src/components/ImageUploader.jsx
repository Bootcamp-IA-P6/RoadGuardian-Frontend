import { useRef } from "react";

export default function ImageUploader({ onFileSelected, isLoading }) {
  const inputRef = useRef(null);

  return (
    <div
      className="relative p-12 text-center cursor-pointer group"
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

      {isLoading ? (
        <p className="font-mono text-amber-500 text-sm tracking-wider animate-pulse">
          escaneando imagen...
        </p>
      ) : (
        <>
          <p className="font-body text-concrete-50 text-base">
            Arrastra una foto del pavimento aquí
          </p>
          <p className="font-mono text-gray-500 text-xs mt-2 tracking-wider">
            o haz clic para seleccionar un archivo
          </p>
        </>
      )}
    </div>
  );
}