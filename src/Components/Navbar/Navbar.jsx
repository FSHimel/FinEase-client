import { Link } from "react-router";
import "./Navbar.css";
import { use } from "react";
import AuthContext from "../../Firebase/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const links = (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/add-transaction"}>Add Transaction</Link>
      <Link to={"/my-transactions"}>My Transactions</Link>
      <Link to={"/reports"}>Reports</Link>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar mt-5 w-11/12 mx-auto sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="text-3xl font-black text-[#CF9893]">
          FinEase
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex justify-center gap-10 p-2 w-fit rounded-3xl mx-auto">
          {links}
        </ul>
      </div>
      <div className="navbar-end ">
        <ul className="w-fit p-2 rounded-3xl">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="user" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow"
              >
                <li className="pointer-events-none font-semibold">
                  {user.displayName}
                </li>

                <li className="pointer-events-none text-sm text-gray-500">
                  {user.email}
                </li>

                <li className="mt-2 ">
                  <Link onClick={handleLogOut} to={"/"} className="text-xl">
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex md:gap-10 ">
              <Link to="/login">Login</Link>

              <Link to="/signup">Signup</Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
