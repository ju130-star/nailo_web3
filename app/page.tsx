"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


// 🔥 IMPORTS DO FIREBASE
import { auth } from "@/app/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Interface
interface LoginData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Atualiza campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia dados para o Firebase
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      //  LOGIN REAL COM FIREBASE
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.senha
      );
      // Pega o UID do usuário logado
      const uid = userCredential.user.uid;

      // 🔥 VERIFICAÇÃO NO FIRESTORE
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Usuário existe no Firestore → Redireciona para Home
        router.push("/home");

        alert("Login realizado com sucesso!");
      } else {
        // Usuário não existe no Firestore
        setError("Conta não encontrada no banco de dados.");
        await auth.signOut(); // Opcional: desloga se não tiver registro
      }

    } catch (err: any) {
      setError("Email ou senha incorretos.");
      console.log("Erro Firebase:", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <img
          src="/img/Nailo1.png"
          alt="Descrição"
          width={50}
          height={50}
        />
      </header>

      <main className="main-content">
        <div className="card-cadastro">
          <h2 className="card-title-login">Entre</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={loginData.senha}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🛑 Removi o Link do botão — agora o botão faz login */}
            <button type="submit" className="btn-entrar" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>


            {error && <p style={{ color: "red" }}>{error}</p>}

            <p className="register-text">
              Não tem conta?
              <a href="/cadastro" className="aqua-link">
                Cadastre-se
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
