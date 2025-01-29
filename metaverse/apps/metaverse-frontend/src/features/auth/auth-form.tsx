import { useState } from "react";
import { SigninForm } from "./signin-form";
import { SignupForm } from "./signup-form";
import { MetaVerseLogo } from "@/components/metaverse-logo";

const AuthForms = () => {
  const [isSign, setIsSign] = useState(true);
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center p-12 bg-gradient-to-b from-pink-50 to-pink-100">
        <div className="max-w-md w-full">
          <MetaVerseLogo />
          {isSign && <SigninForm />}
          {!isSign && <SignupForm />}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isSign ? "Not a member? " : "Already have a member! "}
            <button
              onClick={() => setIsSign((prev) => !prev)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSign ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="h-full w-full bg-gradient-to-b from-zinc-800 to-zinc-950 flex items-center justify-center p-12">
          <div className="text-center space-y-8">
            <h2 className="text-6xl font-bold text-white mb-4">
              Enter the Metaverse
            </h2>
            <p className="text-3xl text-white opacity-90">
              Experience the future of digital interaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
