"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(data.error || "Erreur lors de l'envoi de l'email");
      } else {
        setMessage("Lien de réinitialisation envoyé. Vérifiez votre email !");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-[#000091] p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-[modak] text-white">
          Réinitialiser le mot de passe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {error && <div className="p-2 bg-red-500 text-white rounded">{error}</div>}
          {message && <div className="p-2 bg-green-500 text-white rounded">{message}</div>}

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-white font-[poppins]"
            >
              Entrez votre email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border font-[poppins] border-white p-2 focus:border-blue-500 focus:ring-2 focus:ring-[#ff6400] focus:outline-none text-white"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white font-[poppins] m-0 py-2 text-[#000091] font-semibold shadow-md hover:bg-[#000091] hover:text-white hover:border border-white transition disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </button>

          <a
            href="/"
            className="px-0 text-white font-[poppins] text-xs"
          >
            Retour à la Connexion
          </a>
        </form>
      </div>
    </div>
  );
}
