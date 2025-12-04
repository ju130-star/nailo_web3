'use client';
import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import Link from "next/link";
import { auth } from "@/app/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/app/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";


interface FormData {
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
}

const Cadastro: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
    });

    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordError(null);
        setSuccessMessage(null);

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleSenhaVisibility = () => setShowSenha(prev => !prev);
    const toggleConfirmarSenhaVisibility = () => setShowConfirmarSenha(prev => !prev);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setSuccessMessage(null);

        if (formData.senha !== formData.confirmarSenha) {
            setPasswordError("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        try {
            // Cria usuário no Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);

            // Pega o UID do usuário recém-criado
            const uid = userCredential.user.uid;

            // Salva informações adicionais no Firestore
            await setDoc(doc(db, "users", uid), {
                email: formData.email,
                telefone: formData.telefone,
                criadoEm: new Date()
            });

            setSuccessMessage("Cadastro realizado com sucesso!");

            // Limpa o formulário
            setFormData({
                email: '',
                telefone: '',
                senha: '',
                confirmarSenha: '',
            });



            // Se quiser redirecionar automaticamente depois:
            // setTimeout(() => window.location.href = "/", 1500);

        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setPasswordError("Este email já está em uso.");
            } else if (error.code === "auth/weak-password") {
                setPasswordError("A senha deve ter pelo menos 6 caracteres.");
            } else {
                setPasswordError("Erro ao cadastrar. Tente novamente.");
            }
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <img src="/img/Nailo1.png" width={50} height={50} alt="logo" />
            </header>

            <main className="main-content">
                <div className="card-cadastro">
                    <h2 className="card-title-login">Cadastro</h2>

                    {passwordError && (
                        <div className="message error-message">
                            {passwordError}
                            <button className="close-btn" onClick={() => setPasswordError(null)}>
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {successMessage && (
                        <div className="message success-message">
                            {successMessage}
                            <button className="close-btn" onClick={() => setSuccessMessage(null)}>
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <form className="cadastro-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Telefone</label>
                            <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Senha</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showSenha ? 'text' : 'password'}
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={toggleSenhaVisibility}
                                >
                                    {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Confirmar Senha</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmarSenha ? 'text' : 'password'}
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={toggleConfirmarSenhaVisibility}
                                >
                                    {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-cadastro">Cadastrar</button>

                        <p className="register-text">
                            Já tem conta? <a href="/" className="register-link">Entre</a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Cadastro;
