/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

const ListItem = styled.li<{ isFirst?: boolean }>`
    padding: ${(p) => p.theme.spacing(2)};
    background: ${(p) => p.theme.colors.surfaceAlt};
    border-radius: ${(p) => p.theme.radius.sm};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const Content = styled.div`
    flex: 1;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${(p) => p.theme.spacing(0.5)};
`;

const Title = styled.div<{ completed: boolean; isFirst?: boolean }>`
    font-weight: ${(p) => (p.isFirst ? 600 : 500)};
    color: ${(p) => (p.completed ? p.theme.colors.textMuted : p.theme.colors.text)};
    cursor: pointer;
`;

const DateText = styled.div`
    font-size: 12px;
    color: ${(p) => p.theme.colors.textMuted};
    margin-top: ${(p) => p.theme.spacing(1)};
`;

const MoreButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 14px;
        height: 14px;
    }
`;

const Description = styled.div<{ expanded: boolean }>`
    font-size: 13px;
    color: ${(p) => p.theme.colors.textMuted};
    font-weight: normal;
    margin-top: ${(p) => p.theme.spacing(1)};
    line-height: 1.5;

    max-height: ${(p) => (p.expanded ? "200px" : "0")};
    opacity: ${(p) => (p.expanded ? 1 : 0)};
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
`;

const IconButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 6px;
`;

type TaskItemProps = {
    task: Task;
    isFirst?: boolean;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
};

export const TaskItem = (p: TaskItemProps) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <ListItem isFirst={p.isFirst}>
            <Content>
                <TitleRow>
                    <Title
                        completed={p.task.completed}
                        isFirst={p.isFirst}
                        onClick={() => p.onToggle(p.task.id)}
                    >
                        {p.task.title}
                    </Title>

                    {p.task.description && p.task.description.trim() !== "" && (
                        <MoreButton
                            onClick={() => setShowDescription((v) => !v)}
                            aria-label="Показать описание"
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" fill="#666" />
                                <circle cx="12" cy="12" r="2" fill="#666" />
                                <circle cx="19" cy="12" r="2" fill="#666" />
                            </svg>
                        </MoreButton>
                    )}
                </TitleRow>

                <Description expanded={showDescription}>{p.task.description}</Description>

                <DateText>
                    {p.task.createdAt.toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </DateText>
            </Content>

            <div>
                <IconButton onClick={() => p.onEdit(p.task)} aria-label="Изменить">
                    ✏️
                </IconButton>

                <IconButton onClick={() => p.onRemove(p.task.id)} aria-label="Удалить">
                    ❌
                </IconButton>
            </div>
        </ListItem>
    );
};
