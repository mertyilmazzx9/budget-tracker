// components/Popup.tsx
import React, { useEffect } from 'react';

type PopupProps = {
  message: string;
  onClose: () => void;
};

export default function Popup({ message, onClose }: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Popup 3 saniye sonra kapanacak

    return () => clearTimeout(timer); // Temizleme işlemi
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
      <span>{message}</span>
    </div>
  );
}
