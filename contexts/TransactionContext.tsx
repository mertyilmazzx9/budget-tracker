import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction } from '../components/types';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

interface TransactionProviderProps {
  children: ReactNode; // children prop'ı eklendi
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => { // children burada alınır
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    // Burada, işlemi yerel depolama ya da başka bir veri kaynağına da kaydedebilirsiniz.
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
