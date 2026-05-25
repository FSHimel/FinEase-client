import Hero from "../Components/Hero";
import { use, useEffect, useState } from "react";
import AuthContext from "../Firebase/AuthContext";

const Home = () => {
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
  const { balance, income, expenses } = transactions;
  return (
    <div>
      <Hero></Hero>
      <section className="py-16 px-6 bg-[#F1FFFA]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance */}
          <div className="p-6 rounded-2xl shadow-md bg-[#D5C7BC] text-center">
            <h3 className="text-[#454545] text-lg font-semibold">
              Total Balance
            </h3>
            <p className="text-3xl font-bold mt-4 text-[#454545]">${balance}</p>
          </div>

          {/* Income */}
          <div className="p-6 rounded-2xl shadow-md bg-[#93B7BE] text-center">
            <h3 className="text-[#454545] text-lg font-semibold">
              Total Income
            </h3>
            <p className="text-3xl font-bold mt-4 text-[#454545]">${income}</p>
          </div>

          {/* Expenses */}
          <div className="p-6 rounded-2xl shadow-md bg-[#785964] text-white text-center">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-3xl font-bold mt-4">${expenses}</p>
          </div>
        </div>
      </section>

      {/* Static section  */}

      <section className="py-16 px-6 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Budgeting Tips */}
          <div className="p-8 rounded-2xl shadow-md bg-[#D5C7BC]">
            <h2 className="text-2xl font-bold text-[#454545] mb-4">
              💡 Budgeting Tips
            </h2>

            <div className="space-y-3 text-[#454545] list-disc">
              <li>Follow the 50/30/20 rule for budgeting</li>
              <li>Track every expense, even small ones</li>
              <li>Set monthly savings goals</li>
              <li>Avoid unnecessary impulse spending</li>
              <li>Review your budget weekly</li>
            </div>
          </div>

          <div className="p-8 rounded-2xl shadow-md bg-[#93B7BE]">
            <h2 className="text-2xl font-bold text-[#454545] mb-4">
              📊 Why Financial Planning Matters
            </h2>

            <p className="text-[#454545] leading-relaxed">
              Financial planning helps you control your money instead of letting
              your money control you. It allows you to prepare for emergencies,
              achieve long-term goals, reduce stress, and build financial
              freedom. With proper planning, you can make smarter decisions and
              secure a stable future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
