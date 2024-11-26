import React, { useEffect, useState } from 'react';
import { expenseCategories } from './categories';

export default function BudgetLimits() {
  const [limits, setLimits] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const storedLimits = JSON.parse(localStorage.getItem('budgetLimits') || '{}');
    const defaultLimits = expenseCategories.reduce((acc, cat) => {
      acc[cat.name] = storedLimits[cat.name] || cat.defaultLimit;
      return acc;
    }, {} as { [key: string]: number });
    setLimits(defaultLimits);
  }, []);

  const updateLimit = (category: string, newLimit: number) => {
    const updatedLimits = { ...limits, [category]: newLimit };
    setLimits(updatedLimits);
    localStorage.setItem('budgetLimits', JSON.stringify(updatedLimits));
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Bütçe Limitlerini Ayarla</h3>
      {expenseCategories.map((cat) => (
        <div key={cat.name} className="mb-2">
          <label className="block text-sm font-medium mb-1">
            {cat.name} Limiti (TL):
          </label>
          <input
            type="number"
            value={limits[cat.name] || ''}
            onChange={(e) => updateLimit(cat.name, Number(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      ))}
    </div>
  );
}
