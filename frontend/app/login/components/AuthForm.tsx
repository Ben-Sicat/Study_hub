// components/AuthForm.tsx
'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true); 
    console.log(process.env.local)

    try {
     
      await signIn("google");
      console.log("Sign in with Google");

    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <button
        onClick={handleSignInWithGoogle}
        className={`bg-blue-500 text-white p-2 mt-4 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
}

export default AuthForm;
