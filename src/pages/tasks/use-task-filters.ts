import { useState, useMemo } from 'react';
import { TaskCardProps, TaskStatus, TaskPriority } from './tasks-data';

export type SortOption = 'newest' | 'oldest' | 'priority' | 'alphabetical';
export type GroupOption = 'status' | 'project' | 'assignee' | 'priority';

export function useTaskFilters(tasks: TaskCardProps[]) {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
    const [selectedProject, setSelectedProject] = useState<string | 'all'>('all');
    const [selectedAssignee, setSelectedAssignee] = useState<string | 'all'>('all');
    const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [groupBy, setGroupBy] = useState<GroupOption>('status');

    const filteredTasks = useMemo(() => {
        let result = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.id.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
            const matchesProject = selectedProject === 'all' || task.project === selectedProject;
            const matchesAssignee = selectedAssignee === 'all' || task.assignee?.name === selectedAssignee;
            const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;

            return matchesSearch && matchesStatus && matchesProject && matchesAssignee && matchesPriority;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
            if (sortBy === 'priority') {
                const priorityScore = { urgent: 4, high: 3, medium: 2, low: 1 };
                return priorityScore[b.priority] - priorityScore[a.priority];
            }
            return 0;
        });

        return result;
    }, [tasks, search, selectedStatus, selectedProject, selectedAssignee, selectedPriority, sortBy]);

    const projects = useMemo(() => ['all', ...new Set(tasks.map(t => t.project))], [tasks]);
    const assignees = useMemo(() => ['all', ...new Set(tasks.filter(t => t.assignee).map(t => t.assignee!.name))], [tasks]);
    const priorities: (TaskPriority | 'all')[] = ['all', 'low', 'medium', 'high', 'urgent'];

    return {
        search,
        setSearch,
        selectedStatus,
        setSelectedStatus,
        selectedProject,
        setSelectedProject,
        selectedAssignee,
        setSelectedAssignee,
        selectedPriority,
        setSelectedPriority,
        sortBy,
        setSortBy,
        groupBy,
        setGroupBy,
        filteredTasks,
        projects,
        assignees,
        priorities
    };
}
