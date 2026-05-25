import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { use, useEffect, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

import { Pie } from "react-chartjs-2";
import AuthContext from "../Firebase/AuthContext";
const Reports = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://fin-ease-server-pi.vercel.app/summary?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
        });
    }
  }, [user]);
  const { balance, income, expense } = transactions;
  const data = {
    labels: ["balance", "income", "expense"],
    datasets: [
      {
        data: [balance, income, expense],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-black my-5 underline">
        Summary by Category
      </h1>
      <div style={{ width: "400px", margin: "auto" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Reports;
