import React from 'react';
import { expenseCategories, incomeCategories } from './categories';

const CategoryDetails: React.FC<{ transactions: any[], categoryLimits: any }> = ({ transactions, categoryLimits }) => {
  // Gider kategorilerinin toplamlarını hesapla
  const expenseDetails = expenseCategories.map((category) => {
    const total = transactions
      .filter((t) => t.type === 'expense' && t.category === category.name)
      .reduce((sum, t) => sum + t.amount, 0);

    const limit = categoryLimits[category.name] || 0;
    const percent = limit > 0 ? (total / limit) * 100 : 0;

    return { ...category, total, limit, percent };
  });

  // Gelir kategorilerinin toplamlarını hesapla
  const incomeDetails = incomeCategories.map((category) => {
    const total = transactions
      .filter((t) => t.type === 'income' && t.category === category.name)
      .reduce((sum, t) => sum + t.amount, 0);

    return { ...category, total };
  });

  return (
    <div className="space-y-6">
      {/* Gelir Detayları */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Gelir Detayları</h3>
        <ul className="space-y-3">
          {incomeDetails.map((category) => (
            <li key={category.name} className="flex justify-between text-gray-800">
              <span>{category.name}</span>
              <span>{category.total.toFixed(2)} ₺</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gider Detayları */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Gider Detayları</h3>
        <ul className="space-y-3">
          {expenseDetails.map((category) => (
            <li key={category.name} className="flex justify-between text-gray-800">
              <span>{category.name}</span>
              <span>{category.total.toFixed(2)} ₺</span>
              <span className="text-sm text-gray-500">Limit: {category.limit} ₺</span>
              <span
                className={`text-sm ${category.percent >= 80 ? 'text-red-500' : 'text-green-500'}`}
              >
                {category.percent.toFixed(2)}% {category.percent >= 80 && '(Uyarı: Limitin %80\'i dolmuş)'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDetails;
