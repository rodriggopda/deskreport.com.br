# 📋 Backlog de Implementação API: deskReports

Este documento detalha as tarefas técnicas para a construção do backend multi-tenant do **deskReports**. Todas as entidades devem ser obrigatoriamente vinculadas a uma `organization_id`.

---

## 🏗️ 1. Core & Multi-tenancy (Base)
- [ ] **Criar tabela `organizations`**
    - Atributos: `id` (UUID), `name`, `slug` (unique), `owner_id` (FK users), `created_at`, `updated_at`.
- [ ] **Implementar Middleware de Escopo Global**
    - Toda requisição deve validar o `organization_id` vindo do Header ou JWT.
    - Garantir que nenhum dado seja retornado sem o filtro `WHERE organization_id = ?`.

---

## 👤 2. Gerenciamento de Usuários e Acessos (Users & Invites)
- [x] **Criar tabela `organization_users` (Pivô de Vínculo)**
    - Atributos: `organization_id`, `user_id`, `role` (owner, admin, member, viewer), `joined_at`.
- [x] **Criar tabela `invites` (Convites)**
    - Atributos: `id`, `organization_id`, `email`, `role`, `token` (unique), `expires_at`, `status` (pending, accepted, expired).
- [x] **Implementar Endpoints de Gestão de Membros**
    - `POST /invites`: Gerar convite para um e-mail com cargo definido.
    - `GET /organizations/members`: Listar todos os usuários vinculados à organização.
    - `DELETE /organizations/members/:user_id`: Remover acesso de um usuário à organização.

---

## 👥 3. Gestão de Equipes (Teams)
- [ ] **Criar tabela `teams`**
    - Atributos: `id`, `organization_id` (FK), `name`, `description`.
- [ ] **Criar tabela de relacionamento `team_members`**
    - Atributos: `team_id`, `user_id`, `role`.
- [ ] **Implementar Endpoints de Equipes**
    - `POST /teams`: Criar equipe.
    - `GET /teams`: Listar equipes da organização.
    - `POST /teams/:id/members`: Adicionar usuários a uma equipe.

---

## 📂 4. Gestão de Projetos (Projects)
- [x] **Criar tabela `projects`**
    - Atributos: `id`, `organization_id`, `name`, `status` (active, archived), `start_date`, `end_date`.
- [ ] **Criar tabela `project_assignments`**
    - Tabela pivô para vincular `users` ou `teams` a um projeto.
- [x] **Implementar CRUD de Projetos**
    - `POST /projects`: Criar projeto.
    - `GET /projects`: Listar projetos (filtrados por org).

---

## ✅ 5. Motor de Tarefas (Tasks)
- [ ] **Criar tabela `tasks`**
    - Atributos: `id`, `organization_id`, `project_id`, `reporter_id` (criador), `assignee_id` (responsável), `title`, `description`, `priority` (P1 a P4), `due_date`, `status_id`.
- [ ] **Implementar CRUD de Tarefas**
    - `POST /tasks`: Criar tarefa vinculando a um projeto e um usuário responsável.
    - `PATCH /tasks/:id`: Atualizar responsável (`assignee_id`) ou status.
- [ ] **Gestão de Tags de Tarefas**
    - Criar tabela `tags` (`id`, `organization_id`, `name`, `color`).
    - Criar relação N:N `task_tags`.

---

## 📊 6. Quadros Dinâmicos (Boards/Workflow)
- [ ] **Criar tabela `boards`**
    - Atributos: `id`, `project_id`, `organization_id`, `name`.
- [ ] **Criar tabela `board_columns`**
    - Atributos: `id`, `board_id`, `title`, `order_index`.
- [ ] **Implementar Lógica de Movimentação (Kanban)**
    - `PATCH /tasks/:id/move`: Atualizar `column_id` e posição na lista.

---

## 🔐 Regras de Ouro para os Agentes (Assertividade 99.9%)
1. **Nomes no Plural:** Todas as tabelas no banco de dados **DEVEM** ser no plural (ex: `users`, `tasks`, `organizations`).
2. **Isolamento de Dados:** Nenhuma query pode omitir o `organization_id`. O vazamento de dados entre organizações é uma falha crítica.
3. **Validação de Assignee:** Antes de atribuir uma tarefa (`assignee_id`), valide se o usuário realmente pertence à `organization_id` em questão.
4. **Audit Log:** Toda criação/edição de tarefa deve registrar o `user_id` que realizou a ação.