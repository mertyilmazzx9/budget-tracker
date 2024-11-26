import { useState, useEffect } from 'react';

export default function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categoryLimits, setCategoryLimits] = useState<{ [key: string]: number }>({});
  const [alerts, setAlerts] = useState<string[]>([]); // Uyarı mesajları

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')!) || [];
    setTransactions(storedTransactions);

    const storedLimits = JSON.parse(localStorage.getItem('categoryLimits')!) || {};
    setCategoryLimits(storedLimits);
  }, []);

  useEffect(() => {
    // Uyarıları kontrol et
    const newAlerts: string[] = [];
    Object.keys(categoryLimits).forEach((category) => {
      const totalSpent = transactions
        .filter((t) => t.type === 'expense' && t.category === category)
        .reduce((acc, curr) => acc + curr.amount, 0);
      const limit = categoryLimits[category];
      if (limit && totalSpent >= 0.8 * limit) {
        newAlerts.push(`${category} kategorisi %80 limitine ulaştı!`);
      }
    });
    setAlerts(newAlerts);
  }, [transactions, categoryLimits]);

  const updateCategoryLimit = (category: string, limit: number) => {
    const updatedLimits = { ...categoryLimits, [category]: limit };
    setCategoryLimits(updatedLimits);
    localStorage.setItem('categoryLimits', JSON.stringify(updatedLimits));
  };

  return { transactions, setTransactions, categoryLimits, updateCategoryLimit, alerts };
}
