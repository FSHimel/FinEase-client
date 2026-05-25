import { useLoaderData, useParams } from "react-router";

const ViewDetails = () => {
  const { id } = useParams();
  const transactions = useLoaderData();

  const filteredTransaction = transactions.find(
    (transaction) => transaction._id === id,
  );

  return (
    <div>
      {" "}
      <div className="w-10/12 mx-auto mt-10 border p-6 rounded-xl shadow">
        <h2 className="text-3xl text-center underline font-black mb-5">
          Transaction Details
        </h2>

        <p className="capitalize font-bold text-cyan-600 text-xl">
          <span className="text-2xl text-black">Type:</span>{" "}
          {filteredTransaction.type}
        </p>
        <p className="font-bold text-amber-800 text-xl">
          <span className="text-2xl text-black">Description:</span>{" "}
          {filteredTransaction.description}
        </p>
        <p className=" font-bold text-red-800 text-xl">
          <span className="text-2xl text-black">Amount:</span> $
          {filteredTransaction.amount}
        </p>
        <p className="text-blue-800 font-bold text-xl">
          <span className="text-2xl text-black">Date:</span>{" "}
          {filteredTransaction.date}
        </p>
        <p className="capitalize font-bold text-green-900 text-xl">
          <span className="text-2xl text-black">Category:</span>{" "}
          {filteredTransaction.category}
        </p>
      </div>
    </div>
  );
};

export default ViewDetails;
