import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../services/server/database/supabase";

export function useAuth() {
  const navigate = useNavigate();
  const [authLoading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return {
    authLoading,
    session,
  };
}
