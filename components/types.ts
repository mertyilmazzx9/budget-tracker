export type Transaction = {
    id: number;
    name: string;
    amount: number;
    date: string;
    category: string;
    type: 'Gelir' | 'Gider'; // Gelir ve Gider türleri
    categoryDetails: string;
    description: string; // description ekleniyor
  };
  