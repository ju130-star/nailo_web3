"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      // 🔥 LOGIN REAL COM FIREBASE
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.senha
      );

      alert("Login realizado com sucesso!");

      // Redireciona para a home
      router.push("/home");
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
            <Link href="/home">
              <button type="button" className="btn-entrar">Entrar</button>
            </Link>

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
