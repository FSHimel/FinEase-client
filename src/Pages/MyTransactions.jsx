import { useContext, useEffect, useState } from "react";
import AuthContext from "../Firebase/AuthContext";
import { Link } from "react-router";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://fineaseserver-sooty.vercel.app/transactions?email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTransactions(data);
        });
    }
  }, [user]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl text-center mt-5 font-black">
        <span className="text-[#785964]">My Transactions:</span>{" "}
        {transactions.length}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border rounded-xl p-5 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {transaction.type}
            </h2>

            <p>
              <span className="font-bold">Category:</span>
              {transaction.category}
            </p>

            <p>
              <span className="font-bold">Amount:</span>${transaction.amount}
            </p>

            <p>
              <span className="font-bold">Date:</span>
              {new Date(transaction.date).toLocaleDateString()}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link to={`/update/${transaction._id}`}>
                <button className="btn btn-sm btn-warning">Update</button>
              </Link>

              <button className="btn btn-sm btn-error">Delete</button>

              <Link to={`/transactions/${transaction._id}`}>
                <button className="btn btn-sm btn-info">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
