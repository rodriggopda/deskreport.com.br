# � Backlog de Implementação Dashboard: deskReports

Este documento detalha as tarefas técnicas para a criação e integração do **Dashboard** principal do deskReports. 
**Importante:** O dashboard depende ativamente de dados estatísticos. Portanto, nossos CRUDs atuais (Projetos, Equipes/Permissões/Usuários e Tarefas) precisam ser adaptados e estendidos para suportar agregação e sumarização de dados, respeitando rigorosamente o isolamento por `organization_id`.

---

## ⚙️ 1. Adaptações nos CRUDs Existentes (Backend)
Para que o Dashboard tenha dados ricos sem gargalos de performance, os CRUDs atuais devem retornar dados consolidados ou suportar novos filtros:

- [ ] **Projetos (`/projects`)**
    - Adicionar `% de conclusão` baseado no status das tarefas vinculadas a cada projeto.
    - Incluir contagem total de tarefas vinculadas (`total_tasks`, `completed_tasks`) no retorno do GET.
- [ ] **Equipes, Permissões e Usuários (`/teams`, `/users`)**
    - Retornar a "carga de trabalho" atual de cada membro/equipe (ex: `active_tasks_count`, tarefas pendentes atribuídas).
    - Respeitar permissões de visualização: se um usuário comum bater num endpoint de listagem, ele só deve ver métricas dos times/projetos a que tem acesso.
- [ ] **Tarefas (`/tasks`)**
    - Garantir a viabilidade de filtros rápidos para: "tarefas atrasadas" (`due_date < hoje`), "concluídas esta semana", e "próximas entregas".
    - Criar índices no banco (se necessário) para colunas de `status_id`, `assignee_id` e `due_date` para acelerar queries agregadas.

---

## 📊 2. API de Métricas do Dashboard (Backend)
- [ ] **Criar módulo/controller independente para o `Dashboard`**
    - `GET /dashboard/summary`: Retorna KPIs gerais (Projetos ativos, Tarefas pendentes/atrasadas, Membros ativos).
    - `GET /dashboard/workload`: Retorna dados agrupados de carga de trabalho por membro da equipe (ideal para gráficos).
    - `GET /dashboard/upcoming-deadlines`: Retorna uma lista das próximas tarefas a vencer (ex: próximos 7 dias).
    - `GET /dashboard/project-health`: Retorna o status de "saúde" dos projetos (comparativo de projetado vs realizado).
- [ ] **Regras de Isolamento (Obrigatório)**
    - Todas as agregações e relatórios **DEVEM** incluir `WHERE organization_id = ?`.

---

## 🖥️ 3. Interface do Dashboard (Frontend)
- [ ] **Layout Base (Visão Geral)**
    - Desenvolver a view principal do `/dashboard` com layout responsivo em Grid.
    - Implementar **Cards de KPI**: Totais de Projetos Ativos, Tarefas Atrasadas, Tarefas Concluídas e Equipe.
- [ ] **Gráficos e Componentes Visuais**
    - Integrar biblioteca de gráficos (ex: Recharts, Chart.js ou ApexCharts).
    - Criar gráfico de "Status das Tarefas" (Pie/Donut chart).
    - Criar gráfico de "Carga de Trabalho" ou "Produtividade Semanal" (Bar/Line chart).
- [ ] **Widgets de Ação Rápida**
    - Widget: **Próximas Entregas** (Lista minimalista de tarefas com `due_date` iminente, clicáveis para abrir o modal da tarefa).
    - Widget: **Atividade Recente** (Feed rápido das últimas tarefas concluídas ou alteradas).

---

## � 4. Segurança e Permissões no Dashboard
- [ ] **Controle de Acesso Baseado em Roles (RBAC) e Políticas**
    - **Owner/Admin:** Visão global com estatísticas da organização inteira.
    - **Member (Membro comum):** Puxar apenas as estatísticas gerais referentes aos seus próprios projetos e sua própria carga de trabalho (`assignee_id = me`).
    - **Viewer (Visitante):** Limitar os relatórios disponíveis, exibindo apenas o progresso dos projetos liberados.

---

## 🚀 5. Validações e Testes Finais
- [ ] Realizar teste de carga nos endpoints do Dashboard garantindo que as queries de agregação (`GROUP BY`, `COUNT`) estejam performáticas.
- [ ] Validar a transição de Tenants: Garantir que, ao trocar de organização pelo Topbar, o estado global seja resetado e os gráficos do Dashboard exibam novos dados imediatamente, sem vazamento via cache do Zustand/React Query.