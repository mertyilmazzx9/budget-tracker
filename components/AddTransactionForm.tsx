import React, { useState } from 'react';
import { expenseCategories, incomeCategories } from './categories';

interface AddTransactionFormProps {
  transactions: any[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ transactions, setTransactions }) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const newTransaction = {
      type,
      category,
      amount:amount ,
      date,
    };

    const updatedTransactions = [...transactions, newTransaction];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);

    // Formu sıfırla
    setCategory('');
    setAmount('');
    setDate('');
  };

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Gelir veya Gider Seçimi */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tür</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
      </div>

      {/* Kategori Seçimi */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Bir kategori seçin</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tutar */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tutar</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Tarih */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tarih</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Kaydet Butonu */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Kaydet
      </button>
    </form>
  );
};

export default AddTransactionForm;
