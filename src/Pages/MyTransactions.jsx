import { useContext, useEffect, useState } from "react";
import AuthContext from "../Firebase/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleModal = (transaction) => {
    setSelectedTransaction(transaction);
    document.getElementById("my_modal_5").showModal();
  };

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://fin-ease-server-pi.vercel.app/transactions?email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
        });
    }
  }, [user]);

  const handleDeletTransaction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://fin-ease-server-pi.vercel.app/transactions/${id}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
          const remainingTransactions = transactions.filter(
            (transaction) => transaction._id !== id,
          );

          setTransactions(remainingTransactions);

          Swal.fire("Transaction has been deleted.");
        }
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const type = form.type.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;
    const email = form.email.value;
    const name = form.name.value;

    const updatedTransaction = {
      type,
      category,
      amount,
      description,
      date,
      email,
      name,
    };

    fetch(
      `https://fin-ease-server-pi.vercel.app/transactions/update/${selectedTransaction._id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedTransaction),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {

        const updatedTransactions = transactions.map((transaction) =>
          transaction._id === selectedTransaction._id
            ? { ...transaction, ...updatedTransaction }
            : transaction
        );

        setTransactions(updatedTransactions);

        Swal.fire(
          "Success!",
          "Transaction updated successfully",
          "success"
        );
    }
      });

    document.getElementById("my_modal_5").close();
  };

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
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleModal(transaction)}
              >
                Update
              </button>
              <button
                onClick={() => handleDeletTransaction(transaction._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>

              <Link to={`/transactions/${transaction._id}`}>
                <button className="btn btn-sm btn-info">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Modal  */}
      <dialog id="my_modal_5" className="modal">
        <form onSubmit={handleUpdate} className="w-11/12 ">
          <div className="modal-box mx-auto">
            <h3 className="font-bold text-2xl mb-5 text-[#454545]">
              Update Transaction
            </h3>

            {/* Type */}
            <div>
              <label className=" mb-1 font-medium">Type</label>
              <select
                name="type"
                value={selectedTransaction?.type || ""}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    type: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <input
                className="input input-bordered w-full mt-2"
                name="description"
                value={selectedTransaction?.description || ""}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Category */}
            <div>
              <label className=" mb-1 font-medium">Category</label>
              <select
                name="category"
                value={selectedTransaction?.category || ""}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
                required
              >
                <option value="">Select Category</option>

                {/* Income Categories */}
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="freelancing">Freelancing</option>
                <option value="business">Business</option>

                {/* Expense Categories */}
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Amount</label>
              <input
                className="input input-bordered w-full mt-2"
                value={selectedTransaction?.amount || ""}
                name="amount"
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    amount: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                className="input input-bordered w-full mt-2"
                value={selectedTransaction?.date || ""}
                name="date"
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    date: e.target.value,
                  })
                }
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block mb-1 font-medium">User Email</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block mb-1 font-medium">User Name</label>
              <input
                type="text"
                name="name"
                value={user?.displayName}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>

            <div className="modal-action">
              <button
                method="dialog"
                className="btn bg-[#93B7BE] border-0 font-semibold hover:bg-[#597c83] hover:text-white"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </dialog>
      ;
    </div>
  );
};

export default MyTransactions;
