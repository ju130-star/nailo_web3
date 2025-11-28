"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "auth=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Bem-vindo!</h1>

      <button
        onClick={logout}
        style={{
          marginTop: 20,
          background: "red",
          color: "#fff",
          padding: 10,
          borderRadius: 6,
          border: 0,
        }}
      >
        Sair
      </button>
    </div>
  );
}
