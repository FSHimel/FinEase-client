import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../Firebase/AuthContext";

const Login = () => {
  const { signInUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogleSingIn = () => {
    googleSignIn()
      .then(() => {
        navigate(location.state || "/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-[#D5C7BC] backdrop-blur-md shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset w-80">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    placeholder="Email"
                  />

                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      className="input"
                      name="password"
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute top-4 right-4 cursor-pointer z-50"
                    >
                      {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                    </span>
                  </div>

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>

                  <button className="btn bg-[#93B7BE] border-0 mt-4">
                    Login
                  </button>
                  <p>
                    Don't have an account? Please{" "}
                    <Link
                      className="text-blue-400 hover:text-blue-600"
                      to={"/register"}
                    >
                      Register
                    </Link>{" "}
                  </p>
                </fieldset>
              </form>
              {/* Google login  */}
              <button
                onClick={handleGoogleSingIn}
                className="btn bg-[#93B7BE] text-black border-0"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
