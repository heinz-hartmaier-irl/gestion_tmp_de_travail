"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(4, "Mot de passe trop court"),
});

export default function LoginForm() {
  const router = useRouter();
  const qs = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authQuery = qs.get("auth"); // "required" | "expired" éventuel
  const banner =
    authQuery === "required"
      ? "Veuillez vous connecter pour accéder au tableau de bord."
      : authQuery === "expired"
      ? "Session expirée. Veuillez vous reconnecter."
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = LoginSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.flatten().formErrors.join(" • ") || "Champs invalides");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Identifiants invalides");
        setLoading(false);
        return;
      }

      // Le middleware gère l’accès ; on route selon le rôle renvoyé pour UX
      const role = data?.user?.role;
      if (role === "admin") {
        router.push("/dashboard-admin");
      } else {
        router.push("/dashboard-user");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
        <h1 className="text-2xl font-semibold mb-2">Connexion</h1>
        <p className="text-sm text-gray-500 mb-6">
          Entrez vos identifiants pour accéder à votre espace.
        </p>

        {banner && (
          <div className="mb-4 rounded-lg bg-yellow-50 text-yellow-900 px-3 py-2 text-sm">
            {banner}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="votre@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#000091] text-white py-3 shadow-lg hover:bg-[#0000cc] transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-right">
          <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </div>
  );
}
