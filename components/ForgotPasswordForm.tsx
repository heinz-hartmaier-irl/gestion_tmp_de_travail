'use client';

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la demande");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f8]">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-10 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#000091] rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#ff6400] rounded-full opacity-20"></div>

        <h2 className="mb-8 text-center text-4xl font-[Modak] text-[#000091]">
          Réinitialiser le mot de passe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-500 p-3 text-center text-sm font-[poppins] text-white shadow-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="rounded-lg bg-green-500 p-3 text-center text-sm font-[poppins] text-white shadow-sm">
              {message}
            </div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 font-[poppins] font-semibold text-[#000091]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2 font-[poppins] focus:border-[#000091] focus:ring-2 focus:ring-[#000091] outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#000091] text-white font-[poppins] font-semibold py-3 shadow-lg hover:bg-[#0000cc] transition disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      </div>
    </div>
  );
}
