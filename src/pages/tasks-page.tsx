/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { makeTask, type Task } from "../entities/task";
import { TaskList } from "../components/task-list";
import { TaskModal } from "../components/task-modal";

const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 0 16px;
`;

const Controls = styled.div`
    display: flex;
    gap: ${(p) => p.theme.spacing(1)};
    margin-bottom: ${(p) => p.theme.spacing(2)};
`;

export const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([makeTask("Первая задача"), makeTask("Вторая задача")]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAdd = () => setTasks((s) => [makeTask("Новая задача"), ...s]);

    const handleToggle = (id: string) => {
        setTasks((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const handleRemove = (id: string) => setTasks((s) => s.filter((t) => t.id !== id));

    const handleEditSave = (id: string, newTitle: string, newDescription: string) => {
        setTasks((s) => s.map((t) => (t.id === id ? { ...t, title: newTitle, description: newDescription } : t)));
    };

    const sortedTasks = tasks.slice().sort((a, b) => +b.createdAt - +a.createdAt);

    return (
        <Container>
            <h1>Задачи</h1>
            <Controls>
                <button onClick={handleAdd}>Добавить</button>
            </Controls>

            <TaskList tasks={sortedTasks} onToggle={handleToggle} onRemove={handleRemove} onEdit={(t) => setEditingTask(t)} />

            {editingTask && (
                <TaskModal task={editingTask} onClose={() => setEditingTask(null)} onSave={handleEditSave} />
            )}
        </Container>
    );
};
