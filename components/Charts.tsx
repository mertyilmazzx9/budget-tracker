import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const Charts = ({ transactions, categoryLimits }) => {
  const income = transactions.filter((transaction) => transaction.type === "income");
  const expense = transactions.filter((transaction) => transaction.type === "expense");

  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
  const expenseTotal = expense.reduce((acc, curr) => acc + curr.amount, 0);

  // Grafik verisini hazırlayalım
  const data = [
    { name: "Gelir", value: incomeTotal },
    { name: "Gider", value: expenseTotal },
  ];

  return (
    <div>
      <h3>Gelir ve Giderler</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
