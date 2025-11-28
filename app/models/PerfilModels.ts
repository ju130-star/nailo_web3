// src/data/data.ts
// ESTA CAMADA DEFINE AS ESTRUTURAS DE DADOS (MODEL) E FORNECE DADOS MOCKADOS.

// -----------------------------------------------------------------------------
// 1. INTERFACES DE DADOS
// -----------------------------------------------------------------------------

// Interface para um "trabalho" ou serviço realizado (para a galeria visual do perfil)
export interface Trabalho {
    id: string;
    imageUrl: string;
    descricao: string; // Ex: "Unhas Decoradas", "Corte Moderno"
}

// Interface para um item da tabela de preços
export interface ItemTabelaPrecos {
    id: string;
    descricao: string; // Ex: "Corte Cabelo", "Coloração Completa"
    preco: number;
}

// Interface principal para um perfil completo (usado tanto para Cliente quanto para Profissional)
export interface Perfil {
    id: string;
    nome: string;
    telefone: string;
    email?: string; // Campo opcional
    bio?: string; // Campo opcional para descrição/biografia
    // Propriedades específicas para visualização na página de perfil
    meusTrabalhos?: Trabalho[];
    tabelaPrecos?: ItemTabelaPrecos[];
}

// -----------------------------------------------------------------------------
// 2. DADOS MOCKADOS (Simulam o retorno do Firebase/API)
// -----------------------------------------------------------------------------

export const mockPerfis: Perfil[] = [
    // Perfil de Exemplo 1 (Pedro Cliente)
    {
        id: 'pedro_id',
        nome: 'Pedro Cliente',
        telefone: '(XX) 9XXXX-XXXX',
        meusTrabalhos: [
            // ... (Dados de trabalhos de Pedro)
        ],
        tabelaPrecos: [
            // ... (Dados de preços de Pedro)
        ]
    },
    // Perfil de Exemplo 2 (Josias Profissional)
    {
        id: 'josias_id',
        nome: 'Josias Profissional',
        telefone: '(XX) 9XXXX-XXXX',
        meusTrabalhos: [
            // ... (Dados de trabalhos de Josias)
        ],
        tabelaPrecos: [
            // ... (Dados de preços de Josias)
        ]
    },
    // Perfil de Exemplo 3 (Cleide)
    {
        id: 'cleide_id',
        nome: 'Cleide',
        telefone: '(XX) 9XXXX-XXXX',
        meusTrabalhos: [
            // ... (Dados de trabalhos de Cleide)
        ],
        tabelaPrecos: [
            // ... (Dados de preços de Cleide)
        ]
    }
];