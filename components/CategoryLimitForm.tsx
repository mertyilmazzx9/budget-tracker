// components/CategoryLimitForm.tsx
import React, { useState } from 'react';

export default function CategoryLimitForm({ onSave }: { onSave: (limits: { [key: string]: number }) => void }) {
  const [limits, setLimits] = useState<{ [key: string]: number }>({
    food: 0,
    transport: 0,
    entertainment: 0,
    salary: 0,
  });

  const [showPopup, setShowPopup] = useState(false);

  // Limitleri kaydetme işlemi
  const handleSaveLimits = () => {
    localStorage.setItem('categoryLimits', JSON.stringify(limits));  // Limitleri localStorage'a kaydet
    onSave(limits);
    setShowPopup(true);

    // Popup'ı 2 saniye sonra kapatma
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Yemek</label>
        <input
          type="number"
          value={limits.food}
          onChange={(e) => setLimits({ ...limits, food: parseFloat(e.target.value) })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Ulaşım</label>
        <input
          type="number"
          value={limits.transport}
          onChange={(e) => setLimits({ ...limits, transport: parseFloat(e.target.value) })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Eğlence</label>
        <input
          type="number"
          value={limits.entertainment}
          onChange={(e) => setLimits({ ...limits, entertainment: parseFloat(e.target.value) })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Maaş</label>
        <input
          type="number"
          value={limits.salary}
          onChange={(e) => setLimits({ ...limits, salary: parseFloat(e.target.value) })}
          className="border p-2 w-full"
        />
      </div>

      <button
        onClick={handleSaveLimits}
        className="bg-blue-500 text-white p-2 rounded w-full mt-4"
      >
        Limitleri Kaydet
      </button>

      {/* Popup Uyarısı */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-white rounded shadow-lg">
          Limitler başarıyla belirlendi!
        </div>
      )}
    </div>
  );
}
