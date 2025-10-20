"use client";
export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/";
      }}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
    >
      Se déconnecter
    </button>
  );
}
