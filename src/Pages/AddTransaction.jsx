import { use } from "react";
import AuthContext from "../Firebase/AuthContext";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const { user } = use(AuthContext);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const form = e.target;
    const NewTransactionData = {
      type: form.type.value,
      category: form.category.value,
      amount: Number(form.amount.value),
      description: form.description.value,
      date: form.date.value,
      email: user?.email,
      name: user?.displayName,
    };

    fetch(`https://fin-ease-server-pi.vercel.app/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewTransactionData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transaction added",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        } else {
          console.log("Error");
        }
      });
  };
  return (
    <div>
      <form
        onSubmit={handleAddTransaction}
        className="space-y-4 w-8/12 mx-auto "
      >
        {/* Type */}
        <div>
          <label className=" mb-1 font-medium">Type</label>
          <select name="type" className="w-full border rounded-lg p-2" required>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className=" mb-1 font-medium">Category</label>
          <select
            name="category"
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

        {/* Amount */}
        <div>
          <label className="mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write description"
            className="w-full border rounded-lg p-2"
            rows="3"
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-1 font-medium">User Email</label>
          <input
            type="email"
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
            value={user?.displayName}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
