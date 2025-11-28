"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'lucide-react';

// =================================================================
// 1. DADOS MOCKADOS
// =================================================================

interface Trabalho {
    id: string;
    imageUrl: string;
    descricao: string;
}

interface ItemTabelaPrecos {
    id: string;
    descricao: string;
    preco: number;
}

interface Perfil {
    id: string;
    nome: string;
    telefone: string;
    email?: string;
    meusTrabalhos?: Trabalho[];
    tabelaPrecos?: ItemTabelaPrecos[];
}

const mockPerfis: Perfil[] = [
    {
        id: 'cleide_id',
        nome: 'Cleide Profissional',
        telefone: '(11) 98765-4321',
        email: 'cleide@nailo.com',
        meusTrabalhos: [
            { id: 'ct1', imageUrl: 'url_img_cleide1.jpg', descricao: 'Pé de Luxo' },
            { id: 'ct2', imageUrl: 'url_img_cleide2.jpg', descricao: 'Unha em Gel Azul' },
            { id: 'ct3', imageUrl: 'url_img_cleide3.jpg', descricao: 'Design de Sobrancelha' },
            { id: 'ct4', imageUrl: 'url_img_cleide4.jpg', descricao: 'Massagem Relaxante' },
            { id: 'ct5', imageUrl: 'url_img_cleide5.jpg', descricao: 'Manicure Francesa' },
        ],
        tabelaPrecos: [
            { id: 'cp1', descricao: 'Unha em Gel', preco: 53.90 },
            { id: 'cp2', descricao: 'Pedicure Completa', preco: 67.67 },
            { id: 'cp3', descricao: 'Design de Sobrancelha', preco: 40.00 },
        ]
    }
];

// =================================================================
// 2. CONTROLLER
// =================================================================

const usePerfilController = (perfilId: string) => {
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carregarPerfil = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const dadosPerfil = mockPerfis.find(p => p.id === perfilId);
            if (dadosPerfil) setPerfil(dadosPerfil);
            else setError("Perfil não encontrado.");
        } catch (err) {
            setError("Falha ao carregar informações do perfil.");
        } finally {
            setIsLoading(false);
        }
    }, [perfilId]);

    useEffect(() => {
        carregarPerfil();
    }, [carregarPerfil]);

    return { perfil, isLoading, error };
};

// =================================================================
// 3. HEADER (Separado e correto)
// =================================================================

const AppHeader = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/img/Nailo1.png" alt="Logo" width={60} height={60} className="logo-home" />
            </div>

            <nav className="menu-right">
                <a href="/home">Home</a>
                <a href="/agenda">Agenda</a>
                <a href="/financas">Finanças</a>
                <a href="/">Sair</a>
                <a href="/perfil" className="profile-icon">
                    <User size={28} />
                </a>
            </nav>
        </header>
    );
};

// =================================================================
// 4. PÁGINA PRINCIPAL
// =================================================================

const PerfilPage: React.FC = () => {

    const perfilId = 'cleide_id';
    const { perfil, isLoading, error } = usePerfilController(perfilId);

    const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

    const goToNextWork = () => {
        if (perfil?.meusTrabalhos && currentWorkIndex < perfil.meusTrabalhos.length - 3) {
            setCurrentWorkIndex(prev => prev + 1);
        }
    };

    const goToPrevWork = () => {
        if (currentWorkIndex > 0) {
            setCurrentWorkIndex(prev => prev - 1);
        }
    };

    // ESTADOS DE CARREGAMENTO/ERRO
    if (isLoading) {
        return (
            <div className="perfil-container-base">
                <AppHeader />
                <div className="loading-state">Carregando perfil...</div>
            </div>
        );
    }

    if (error || !perfil) {
        return (
            <div className="perfil-container-base">
                <AppHeader />
                <div className="error-state">Erro: {error || "Perfil não encontrado."}</div>
            </div>
        );
    }

    // -----------------------------------------------------------------
    // VIEW PRINCIPAL
    // -----------------------------------------------------------------

    return (
        <div className="perfil-container-base">
            <AppHeader />

            <main className="perfil-main-content">

                {/* PAINEL ESQUERDO */}
                <div className="perfil-sidebar-left">

                    <div className="profile-picture">
                        <User size={60} color="#00796b" />
                    </div>

                    <div className="profile-info-block">
                        <span className="info-label">Nome</span>
                        <p className="info-value">{perfil.nome}</p>
                    </div>

                    <div className="profile-info-block">
                        <span className="info-label">Telefone</span>
                        <p className="info-value">{perfil.telefone}</p>
                    </div>

                    <div className="profile-info-block">
                        <span className="info-label">Email</span>
                        <p className="info-value">{perfil.email || 'Não informado'}</p>
                    </div>
                </div>

                {/* PAINEL DIREITO */}
                <div className="perfil-content-right">

                    {/* MEUS TRABALHOS */}
                    <div className="my-works-section">
                        <h3>Meus Trabalhos</h3>

                        <div className="works-carousel-container">

                            {perfil.meusTrabalhos?.length ? (
                                <>
                                    <button
                                        onClick={goToPrevWork}
                                        className="carousel-nav-btn prev"
                                        disabled={currentWorkIndex === 0}
                                    >
                                        &lt;
                                    </button>

                                    <div className="works-carousel">
                                        {perfil.meusTrabalhos
                                            .slice(currentWorkIndex, currentWorkIndex + 3)
                                            .map(tr => (
                                                <div key={tr.id} className="work-item">
                                                    <div className="work-placeholder">{tr.descricao}</div>
                                                </div>
                                            ))}
                                    </div>

                                    <button
                                        onClick={goToNextWork}
                                        className="carousel-nav-btn next"
                                        disabled={currentWorkIndex >= perfil.meusTrabalhos.length - 3}
                                    >
                                        &gt;
                                    </button>
                                </>
                            ) : (
                                <p>Nenhum trabalho cadastrado.</p>
                            )}
                        </div>
                    </div>

                    {/* TABELA DE PREÇOS */}
                    <div className="price-table-section">
                        <h3>Tabela de Preços</h3>

                        <div className="price-list">
                            {perfil.tabelaPrecos?.length ? (
                                perfil.tabelaPrecos.map(item => (
                                    <div key={item.id} className="price-item">
                                        <span>{item.descricao}</span>
                                        <strong>R$ {item.preco.toFixed(2).replace('.', ',')}</strong>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum preço cadastrado.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default PerfilPage;
