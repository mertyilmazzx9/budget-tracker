import React, { createContext, useContext, useState } from 'react';

type Budget = {
  category: string;
  limit: number;
  spent: number;
};

interface BudgetContextProps {
  budgets: Budget[];
  addBudget: (category: string, limit: number) => void;
  updateSpent: (category: string, amount: number) => void;
}

const BudgetContext = createContext<BudgetContextProps | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const addBudget = (category: string, limit: number) => {
    setBudgets((prev) => [...prev, { category, limit, spent: 0 }]);
  };

  const updateSpent = (category: string, amount: number) => {
    setBudgets((prev) =>
      prev.map((b) =>
        b.category === category ? { ...b, spent: b.spent + amount } : b
      )
    );
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, updateSpent }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('useBudget must be used within a BudgetProvider');
  return context;
};
