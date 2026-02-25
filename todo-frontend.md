# 📋 Backlog de Implementação Frontend: deskReports

Este documento detalha as tarefas técnicas para a finalização do Core do frontend multi-tenant do **deskReports**, com o objetivo de lançar o MVP.

---

## 🏗️ 1. Core & Multi-tenancy (Base)
- [x] **Integração Real do dropdown de Projetos**
    - Remover mock do Array de projetos no `Topbar`.
    - Implementar a listagem real dos projetos da organização chamando a API de projetos.
- [ ] **Tratamento de Permissões Básicas (UI)**
    - Ocultar botões de edição / configurações críticas para usuários com role de visitante (`viewer`).

---

## 👤 2. Gerenciamento de Usuários e Acessos
- [x] **Gestão de Membros**
    - Criar tela de membros da organização (`/settings/members`).
    - Integração de endpoint para convidar usuários por email.
    - Listar membros ativos por organização e opção para remoção.
- [ ] **Fluxo de Convite (Aceite)**
    - Interface e rota para validação do `token` ao aceitar o convite para uma organização (tela de join).

---

## 👥 3. Gestão de Equipes (Teams)
- [ ] **Interface de Equipes**
    - Criação de página `/settings/teams` com Tabela de equipes ativas.
    - Criar ou adaptar modal para a criação de nova equipe.
- [ ] **Alocação de Usuários em Equipes**
    - Gerenciar a aba lateral para inserção e remoção dos usuários já existentes da organização dentro das equipes.

---

## 📂 4. Gestão de Projetos (Projects)
- [x] **Criação e Configuração de Projetos**
    - UI para cadastrar novos projetos.
    - Refinar as views (Listagem, Grid).
    - Opção de arquivar projetos no painel Settings/Projects.

---

## ✅ 5. Motor de Tarefas (Tasks)
- [ ] **Filtros e Visualização**
    - Validar listagem das tarefas filtradas corretamente via `useTaskStore` integrado à API.
    - Concluir interface de atribuição para setar um Assignee na tarefa.
    - Exibir cores das tags e níveis de prioridade corretos mapeados pelo back.
- [ ] **Atribuição Corrigida**
    - Listar apenas os usuários disponíveis na lista de Assignee da tarefa respectiva de acordo com os membros cadastrados do projeto.

---

## 📊 6. Quadros Dinâmicos (Boards/Workflow)
- [ ] **Kanban Board**
    - Adicionar a listagem interativa `dnd` (drag and drop) na aba Boards de Tarefa.
    - Chamar dinamicamente `PATCH /tasks/:id/move` quando arrastar as tarefas entre as colunas lógicas no front.
- [ ] **Configuração das Colunas**
    - Permitir renomear colunas do Board ou criar novas, integrando ao banco de dados com `order_index`.

---

## 🧪 7. Testes Pesados e Lançamento (MVP)
- [ ] **Fluxos de Teste Essenciais:**
    - Testar criação sucessiva de Organização -> Invite -> Aceite do Membro.
    - Testar navegação trocando de tenant pelo topbar e verificando se os dados do novo tenant são os que populam a tela.
    - Garantir tratamento de erro visual nos requests `UNAUTHORIZED` ou `FORBIDDEN` (limpar cache/logout proativo).
- [ ] **Ajustes de UI / UX**
    - Verificar responsividade em desktop.
    - Validar dark/light mode nas novas telas criadas.

