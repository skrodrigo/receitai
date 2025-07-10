# Receitai

Receitai é uma plataforma de culinária inovadora onde os usuários podem descobrir, criar e compartilhar receitas geradas por inteligência artificial. A aplicação oferece um sistema de créditos que permite aos usuários desbloquear receitas exclusivas, incentivando a interação e o engajamento.

## Requisitos Funcionais

- **RF01: Autenticação de Usuários:** O sistema deve permitir que os usuários se cadastrem e façam login utilizando provedores sociais (ex: Google, GitHub) ou email e senha.
- **RF02: Geração de Receitas com IA:** Os usuários devem poder gerar novas receitas fornecendo um prompt de texto (ex: "um bolo de chocolate vegano sem glúten").
- **RF03: Sistema de Créditos:** Cada usuário deve ter uma quantidade de créditos que podem ser usados para desbloquear receitas geradas pela IA.
- **RF04: Desbloqueio de Receitas:** Para visualizar uma receita completa gerada pela IA, o usuário deve gastar um crédito.
- **RF05: Listagem de Receitas Públicas:** O sistema deve exibir uma lista de receitas que são públicas e não exigem créditos para serem visualizadas.
- **RF06: Busca e Filtro de Receitas:** Os usuários devem poder buscar receitas por título ou ingredientes e filtrar por categorias.
- **RF07: Favoritar Receitas:** Os usuários devem poder marcar receitas como favoritas para acessá-las facilmente mais tarde.
- **RF08: Visualização de Perfil:** Os usuários devem poder visualizar seu perfil, incluindo a quantidade de créditos restantes e suas receitas favoritas.

## Requisitos Não Funcionais

- **RNF01: Segurança:** As senhas dos usuários devem ser armazenadas de forma segura (hash) e a comunicação com o servidor deve ser feita via HTTPS.
- **RNF02: Performance:** A aplicação deve ter um tempo de carregamento rápido, com as receitas e imagens sendo otimizadas para a web.
- **RNF03: Usabilidade:** A interface deve ser intuitiva, responsiva e acessível em diferentes dispositivos (desktop, tablet, mobile).
- **RNF04: Escalabilidade:** A arquitetura do sistema deve ser capaz de suportar um número crescente de usuários e receitas sem degradação de performance.
- **RNF05: Confiabilidade:** A aplicação deve estar disponível 99.9% do tempo.

## Regras de Negócio

- **RN01: Créditos Iniciais:** Novos usuários recebem 10 créditos gratuitos ao se cadastrarem.
- **RN02: Custo por Receita:** Desbloquear uma receita gerada por IA custa 1 crédito.
- **RN03: Sem Créditos:** Se um usuário não tiver créditos suficientes, ele não poderá desbloquear novas receitas, mas ainda poderá visualizar as receitas públicas e as que já desbloqueou.
- **RN04: Propriedade da Receita:** Uma vez que uma receita é desbloqueada por um usuário, ela fica permanentemente acessível para ele em seu perfil, sem a necessidade de gastar mais créditos para visualizá-la novamente.
- **RN05: Receitas Públicas:** Algumas receitas podem ser marcadas como públicas pelo administrador e não consomem créditos para serem visualizadas.

## Tecnologias

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js (API Routes), Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** NextAuth.js
- **IA:** (A definir, ex: OpenAI GPT-4)
