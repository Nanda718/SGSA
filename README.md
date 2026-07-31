# SGSA - Sistema de Gerenciamento de Sala de Aula

O SGSA (Sistema de Gerenciamento de Sala de Aula) é uma aplicação web desenvolvida para centralizar o gerenciamento de ocorrências, equipamentos e ambientes da infraestrutura de TI da Unijorge.

O sistema tem como objetivo facilitar o registro, acompanhamento e resolução de chamados técnicos, além de manter um inventário organizado dos ambientes e equipamentos da instituição.

---

## Objetivos

- Centralizar o gerenciamento de chamados de TI;
- Organizar o inventário de salas, laboratórios e TMAs;
- Controlar equipamentos e suas movimentações;
- Registrar o histórico completo das ocorrências;
- Agilizar o atendimento da equipe de suporte.

---

## Funcionalidades

### Ocorrências
- Abertura de chamados;
- Atualização de status;
- Controle de prioridade e gravidade;
- Histórico de ações;
- Detecção de ocorrências duplicadas.

### Ambientes
- Cadastro de salas;
- Cadastro de laboratórios;
- Cadastro de TMAs;
- Consulta dos ambientes da instituição.

### Equipamentos
- Cadastro de computadores;
- Controle de hostnames;
- Histórico de movimentações;
- Situação dos equipamentos;
- Associação entre equipamento e ambiente.

### Administração
- Cadastro de categorias;
- Gerenciamento de usuários;
- Controle dos estados das ocorrências;
- Relatórios e consultas.

---

## Estrutura do Projeto

```
SGSA/
│
├── assets/
│
├── css/
│
├── js/
│
├── pages/
│
├── backend/
│
├── database/
│
└── README.md
```

---

## Tecnologias

### Front-end

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

### Back-end *(planejado)*

- Node.js
- Express.js

### Banco de Dados *(planejado)*

- PostgreSQL

---

## Estrutura Conceitual

```
Instituição
│
├── Prédio
│   ├── Salas
│   ├── Laboratórios
│   └── TMAs
│
└── Equipamentos
    ├── Computadores
    ├── Monitores
    ├── Projetores
    └── Outros
```

---

## Fluxo de uma Ocorrência

1. Usuário registra um chamado.
2. O sistema identifica o ambiente.
3. O equipamento é associado automaticamente, quando aplicável.
4. A ocorrência recebe categoria, prioridade e gravidade.
5. A equipe realiza o atendimento.
6. A solução é registrada.
7. O histórico permanece armazenado.

---

## Estados das Ocorrências

- Aberto
- Em análise
- Aguardando atendimento
- Em atendimento
- Aguardando material
- Aguardando terceiro
- Resolvido
- Reaberto
- Cancelado

---

## Categorias

- Computador
- Rede
- Monitor
- Projetor
- Vídeo
- Áudio
- Software
- Login
- Energia
- Cabo ou Adaptador
- Mobiliário
- Infraestrutura
- Outro

---

## Equipe

Projeto desenvolvido para a disciplina de Desenvolvimento Web da Unijorge.

---

## Status do Projeto

🚧 Em desenvolvimento

Atualmente o projeto encontra-se na fase de desenvolvimento da interface e modelagem do sistema.

---

## Licença

Este projeto possui fins exclusivamente acadêmicos.
