"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      console.log("✅ Connecté :", data.user);

      // 👉 Redirection selon le poste
      const poste = data.user.poste.toLowerCase();
      if (poste === "admin" || poste === "rh") {
        router.push("/dashboard-admin");
      } else {
        router.push("/dashboard-user");
      }
    } catch (err) {
      console.error("Erreur :", err);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-[#000091] p-8 shadow-lg">
        <h2 className="mb-6 text-center text-4xl font-[modak] text-white">
          Ze-Gestion des Congés
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {error && (
            <div className="rounded-lg bg-red-500 p-2 text-sm font-[poppins]">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-[poppins] font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-[poppins] rounded-lg border border-white p-2 focus:border-white focus:ring-2 focus:ring-[#ff6400] focus:outline-none text-white placeholder-gray-300"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-[poppins] font-medium text-white"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-[poppins] rounded-lg border border-white p-2 focus:border-white focus:ring-2 focus:ring-[#ff6400] focus:outline-none text-white placeholder-gray-300"
              placeholder="••••••••"
              required
            />
            <div className="mt-2 text-right">
              <a
                href="/forgot-password"
                className="text-sm font-[poppins] font-medium text-white hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white font-[poppins] border border-white text-[#000091] py-2 font-semibold shadow-md hover:bg-[#000091] hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
