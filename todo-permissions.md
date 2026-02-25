# 🔐 Definições de Permissões (RBAC) - deskReports

Este documento estabelece os níveis de acesso e permissões para cada perfil de usuário dentro de uma organização no deskReports.

---

## 🎭 Perfis de Usuário

### 1. Owner (Proprietário)
* **Acesso:** Total e irrestrito.
* **Responsabilidades:** Gestão da conta, faturamento e exclusão da organização.
* **Permissões Exclusivas:**
    * Excluir a organização.
    * Transferir propriedade.
    * Gerenciar integrações críticas de nível organizacional.

### 2. Admin (Administrador)
* **Acesso:** Administrativo em nível de operação.
* **Responsabilidades:** Gestão de pessoas, projetos e fluxos de trabalho.
* **Permissões:**
    * Convidar, remover e alterar cargos de membros.
    * Criar, editar e excluir qualquer Projeto ou Equipe.
    * Configurar estruturas de Quadros (Boards) e colunas.
    * Visualizar e editar qualquer tarefa da organização.

### 3. Member (Membro)
* **Acesso:** Operacional.
* **Responsabilidades:** Execução de demandas e colaboração.
* **Permissões:**
    * Criar tarefas em projetos onde está vinculado.
    * Mover e editar tarefas atribuídas a si ou criadas por si.
    * Visualizar membros da mesma equipe/projeto.
    * **Restrições:** Não pode excluir projetos ou remover membros da organização.

### 4. Viewer (Visualizador)
* **Acesso:** Somente leitura.
* **Responsabilidades:** Acompanhamento de progresso (Stakeholders/Clientes).
* **Permissões:**
    * Visualizar progresso de projetos e tarefas específicos.
    * Extrair relatórios de leitura.
    * **Restrições:** Não pode criar, editar, comentar ou mover nenhum registro.

---

## 📊 Matriz de Ações por Recurso

| Recurso             | Owner | Admin | Member | Viewer |
| :------------------ | :---: | :---: | :----: | :----: |
| Deletar Org         | ✅    | ❌    | ❌     | ❌     |
| Gerenciar Convites  | ✅    | ✅    | ❌     | ❌     |
| Criar Projetos      | ✅    | ✅    | ❌     | ❌     |
| Criar Equipes       | ✅    | ✅    | ❌     | ❌     |
| Criar/Editar Task   | ✅    | ✅    | ✅     | ❌     |
| Mover Task (Kanban) | ✅    | ✅    | ✅     | ❌     |
| Ver Reports         | ✅    | ✅    | ✅*    | ✅     |

*\*Membros visualizam relatórios apenas de seus respectivos projetos/equipes.*

---

## 🛠️ Regras para os Agentes de Implementação
1.  **Scope-Based:** Implementar verificações baseadas em escopo (ex: `projects:create`, `tasks:edit`).
2.  **Ownership Check:** Para o perfil `Member`, o sistema deve validar se `task.reporter_id == current_user.id` ou `task.assignee_id == current_user.id` para permitir edições.
3.  **Hard Block:** Qualquer tentativa de acesso a uma `organization_id` diferente da vinculada ao usuário deve retornar `403 Forbidden`.