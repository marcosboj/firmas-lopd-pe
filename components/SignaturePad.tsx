"use client";

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onEnd: (signatureBase64: string) => void;
  onClear: () => void;
}

export function SignaturePad({ onEnd, onClear }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      onClear();
    }
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      // Export signature as base64 image
      onEnd(sigCanvas.current.toDataURL("image/png"));
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Firma del usuario
      </label>
      
      {/* Wrapper con touch-action: none para prevenir scroll en móviles al firmar */}
      <div className="border-2 border-dashed border-gray-300 rounded-md bg-gray-50 overflow-hidden" style={{ touchAction: 'none' }}>
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-48 cursor-crosshair",
          }}
          onEnd={handleEnd}
        />
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Limpiar firma
        </button>
      </div>
    </div>
  );
}
