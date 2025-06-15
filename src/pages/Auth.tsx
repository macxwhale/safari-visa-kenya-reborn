
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    if (!email || !password) {
      setErr("Please fill all fields");
      setLoading(false);
      return;
    }
    if (mode === "signup") {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) setErr(error.message);
      else setErr("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
      else navigate("/");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow max-w-md w-full p-8 border">
        <h1 className="text-2xl font-bold mb-6">{mode === "signin" ? "Sign In" : "Sign Up"}</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-6 flex justify-between">
          {mode === "signin" ? (
            <button className="underline text-sm" type="button" onClick={() => setMode("signup")}>Don't have an account? Sign Up</button>
          ) : (
            <button className="underline text-sm" type="button" onClick={() => setMode("signin")}>Already have an account? Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}
