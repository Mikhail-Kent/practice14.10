import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(1)};
`;

type TaskListProps = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
};

export const TaskList = (p: TaskListProps) => {
    return (
        <List>
            {p.tasks.map((t, index) => (
                <TaskItem
                    key={t.id}
                    task={t}
                    isFirst={index === 0}
                    onToggle={p.onToggle}
                    onRemove={p.onRemove}
                    onEdit={p.onEdit}
                />
            ))}
        </List>
    );
};
