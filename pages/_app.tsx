// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import '../app/globals.css';

function MyApp({ Component, pageProps }: { Component: React.FC; pageProps: any }) {
  const [transactions, setTransactions] = useState<any[]>([]);

  // İlk başta localStorage'den verileri yükle
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')!) || [];
    setTransactions(storedTransactions);
  }, []);

  return (
    <Component
      {...pageProps}
      transactions={transactions}
      setTransactions={setTransactions}
    />
  );
}

export default MyApp;
