// components/FilterForm.tsx
import React, { useState } from 'react';

interface FilterFormProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700">Başlangıç Tarihi</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700">Bitiş Tarihi</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Filtrele
      </button>
    </form>
  );
};

export default FilterForm;
