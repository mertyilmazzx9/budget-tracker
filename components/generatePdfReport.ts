// utils/generatePdfReport.ts

import { jsPDF } from "jspdf";

interface Transaction {
  date: string;
  category: string;
  amount: number;
}

export const generatePdfReport = (transactions: Transaction[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Finansal Rapor", 10, 10);

  doc.setFontSize(12);
  doc.text("Tarih", 10, 20);
  doc.text("Kategori", 60, 20);
  doc.text("Tutar", 110, 20);

  transactions.forEach((transaction, index) => {
    doc.text(transaction.date, 10, 30 + index * 10);
    doc.text(transaction.category, 60, 30 + index * 10);
    doc.text(transaction.amount.toString(), 110, 30 + index * 10);
  });

  doc.save("finansal_rapor.pdf");
};
