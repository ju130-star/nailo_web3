// src/hooks/usePerfilController.ts
// ESTE É O CONTROLLER: Gerencia a busca de dados do perfil e o estado da View.

"use client"; // Marca como componente de cliente para usar Hooks do React.

import { useState, useEffect, useCallback } from 'react';
import { Perfil, mockPerfis } from '../models/PerfilModels'; 
// (Em produção, o PerfilModel faria a busca real no Firebase)

export const usePerfilController = (perfilId: string) => {
    
    // -----------------------------------------------------------------------------
    // ESTADOS
    // -----------------------------------------------------------------------------
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Controla o spinner de carregamento
    const [error, setError] = useState<string | null>(null); // Armazena erros de busca

    // -----------------------------------------------------------------------------
    // FUNÇÕES DE LÓGICA E BUSCA
    // -----------------------------------------------------------------------------

    // useCallback é usado para memorizar a função e evitar loops infinitos no useEffect.
    const carregarPerfil = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // SIMULAÇÃO DA CHAMADA AO MODEL (Banco de Dados)
            // Em produção: const dadosPerfil = await perfilModel.buscarPerfil(perfilId);
            
            // Busca o perfil nos dados mockados pelo ID fornecido
            const dadosPerfil = mockPerfis.find(p => p.id === perfilId);

            if (dadosPerfil) {
                setPerfil(dadosPerfil);
            } else {
                setError("Perfil não encontrado. Verifique o ID.");
            }
        } catch (err) {
            console.error("Erro ao carregar perfil:", err);
            setError("Falha ao carregar informações do perfil.");
        } finally {
            setIsLoading(false);
        }
    }, [perfilId]); // Dependência: A função só será recriada se o 'perfilId' mudar.

    // -----------------------------------------------------------------------------
    // EFEITOS COLATERAIS (Ciclo de vida)
    // -----------------------------------------------------------------------------

    // O useEffect dispara o carregamento do perfil sempre que o componente for montado 
    // ou quando a função 'carregarPerfil' mudar (o que só acontece se perfilId mudar).
    useEffect(() => {
        carregarPerfil();
    }, [carregarPerfil]);

    // -----------------------------------------------------------------------------
    // RETORNO PARA A VIEW
    // -----------------------------------------------------------------------------

    return {
        perfil, // Dados do perfil para exibição
        isLoading, // Status de carregamento
        error, // Mensagem de erro
        recarregarPerfil: carregarPerfil // Função exposta para recarregar manualmente
    };
};