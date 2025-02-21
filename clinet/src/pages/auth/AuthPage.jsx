import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignInUrl = location.pathname === "/signin"; // check current url

  return (
    <div className="min-h-screen flex items-start justify-center bg-emerald-50 pt-5">
      <div className="bg-emerald-100/[0.5] shadow-lg rounded-lg overflow-hidden max-w-md w-full m-5">
        {/* Toggle Buttons */}
        <div className="flex">
          <button
            onClick={() => navigate("/signin")}
            className={`flex-1 text-center py-3 font-semibold ${
              isSignInUrl
                ? "bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                : "bg-emerald-300 text-emerald-900 hover:bg-emerald-500"
            } transition-all duration-300`}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={`flex-1 text-center py-3 font-semibold ${
              !isSignInUrl
                ? "bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                : "bg-emerald-300 text-emerald-900 hover:bg-emerald-500"
            } transition-all duration-300`}
          >
            Sign Up
          </button>
        </div>

        {/* Dynamic Form Rendering */}
        <div className="p-6">{isSignInUrl ? <SignIn /> : <SignUp />}</div>
      </div>
    </div>
  );
};

export default AuthPage;
