import { useState, useEffect } from "react";
import Head from "next/head";
import AddTransactionForm from "../components/AddTransactionForm";
import Charts from "../components/Charts";
import CategoryDetails from "../components/CategoryDetails";
import FilterForm from "../components/FilterForm";
import SetCategoryLimits from "../components/SetCategoryLimits"; // Yeni eklenen bileşen
import { generatePdfReport } from "../components/generatePdfReport"; // Yardımcı dosyayı dahil et

export default function Index() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categoryLimits, setCategoryLimits] = useState<any>({});
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode durumu

  // Filtreleme işlemi
  const filterTransactions = (startDate, endDate) => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')!) || [];
    const filteredTransactions = storedTransactions.filter((transaction) => {
      return (
        (startDate ? new Date(transaction.date) >= new Date(startDate) : true) &&
        (endDate ? new Date(transaction.date) <= new Date(endDate) : true)
      );
    });
    setTransactions(filteredTransactions);
  };

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);

    // LocalStorage'a kaydet
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  // Limitleri kaydet
  const handleSaveLimits = (newLimits) => {
    setCategoryLimits(newLimits);
    localStorage.setItem("categoryLimits", JSON.stringify(newLimits));
    alert("Limitler kaydedildi.");
  };

  // İlk başta tüm işlemleri yükle
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')!) || [];
    setTransactions(storedTransactions);

    const storedLimits = JSON.parse(localStorage.getItem("categoryLimits")!) || {};
    setCategoryLimits(storedLimits);
  }, []);

  // Dark mode'u değiştirme
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}>
      <Head>
        <title>Kişisel Bütçe Takip Uygulaması</title>
      </Head>
      <header className="container mx-auto p-4 text-center">
      <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
  {isDarkMode ? "Kişisel Bütçe Takip Uygulaması" : "Kişisel Bütçe Takip Uygulaması"}
</h1>

        <button
          onClick={toggleDarkMode}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gelir/Gider Ekle Bölümü */}
        <section className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Gelir/Gider Ekle</h2>
          <AddTransactionForm transactions={transactions} setTransactions={setTransactions} />
        </section>

        {/* Filtreleme Bölümü */}
        <section className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filtreleme</h2>
          <FilterForm onFilter={filterTransactions} />
        </section>

        {/* Gelir ve Gider Grafikleri */}
        <section className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Grafikler</h2>
          <Charts transactions={transactions} categoryLimits={categoryLimits} />
        </section>

        {/* Harcama Detayları */}
        <section className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Kategori Detayları</h2>
          <CategoryDetails transactions={transactions} categoryLimits={categoryLimits} />
          {/* PDF İndirme Butonu */}
          <button
            onClick={() => generatePdfReport(transactions)} // PDF fonksiyonunu çağır
            className="bg-blue-500 text-white p-2 rounded mt-4 mx-auto block"
          >
            PDF Olarak İndir
          </button>
        </section>

        {/* Kategori Limitlerini Belirleme Formu */}
        <section className="bg-white p-6 rounded shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-4">Kategori Limitlerini Belirle</h2>
          <SetCategoryLimits categoryLimits={categoryLimits} setCategoryLimits={handleSaveLimits} />
        </section>
      </main>
    </div>
  );
}
