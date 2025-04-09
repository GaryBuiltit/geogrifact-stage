import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const appearance = {
    elements: {
      footerAction: "invisible h-0",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8C969C] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-6">
          {/* Toggle Buttons */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isSignIn
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isSignIn
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Clerk Forms */}
          {isSignIn ? (
            <SignIn
              routing="path"
              path="/"
              signUpUrl="/"
              fallbackRedirectUrl="/home"
              appearance={appearance}
            />
          ) : (
            <SignUp
              routing="path"
              path="/"
              signInUrl="/"
              fallbackRedirectUrl="/home"
              appearance={appearance}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
