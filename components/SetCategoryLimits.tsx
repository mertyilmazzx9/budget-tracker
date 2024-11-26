import React, { useState } from "react";
import { expenseCategories, incomeCategories } from "./categories";

interface SetCategoryLimitsProps {
  categoryLimits: any;
  setCategoryLimits: (newLimits: any) => void;
}

const SetCategoryLimits: React.FC<SetCategoryLimitsProps> = ({ categoryLimits, setCategoryLimits }) => {
  const [limits, setLimits] = useState(categoryLimits);

  const handleLimitChange = (category: string, value: string) => {
    setLimits({
      ...limits,
      [category]: parseFloat(value),
    });
  };

  const handleSaveLimits = () => {
    setCategoryLimits(limits);
    localStorage.setItem("categoryLimits", JSON.stringify(limits));
    alert("Limitler kaydedildi.");
  };

  const renderLimitInputs = (categories: { name: string; defaultLimit: number }[]) => {
    return categories.map((category) => (
      <div key={category.name} className="flex justify-between items-center mb-4">
        <span className="text-gray-700">{category.name}</span>
        <input
          type="number"
          value={limits[category.name] || category.defaultLimit}
          onChange={(e) => handleLimitChange(category.name, e.target.value)}
          className="w-24 p-1 border border-gray-300 rounded-md"
        />
      </div>
    ));
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full ">
      <div className="flex justify-between space-x-6">
        {/* Gider Kategorileri */}
        <div className="w-1/2">
          <h4 className="text-md font-semibold text-gray-600 mb-4">Gider Kategorileri</h4>
          {renderLimitInputs(expenseCategories)}
        </div>
      </div>

      {/* Limitleri Kaydet */}
      <div className="mt-6">
        <button
          onClick={handleSaveLimits}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Limitleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default SetCategoryLimits;
