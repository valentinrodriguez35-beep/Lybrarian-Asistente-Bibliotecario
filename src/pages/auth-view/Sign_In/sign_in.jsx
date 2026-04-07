import React, { useState, useEffect } from "react";
import { supabase } from "../../../services/server/database/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleProviderSubmit = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col h-dvh w-dvw justify-center-safe items-center-safe">
      <h1 className="text-white">Lybrarian</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
            className="text-red-50"
          />
          <button className="bg-red-50">Send</button>
        </div>
        <div>
          <button
            className="bg-white"
            type="button"
            onClick={handleProviderSubmit}
          >
            {" "}
            Sign In Google
          </button>
        </div>
      </form>
    </div>
  );
}
