/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";

const Overlay = styled.div<{ visible: boolean }>`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: ${(p) => (p.visible ? 1 : 0)};
    transition: opacity 0.3s ease;
`;

const Modal = styled.div<{ visible: boolean }>`
    background: ${(p) => p.theme.colors.surface};
    padding: ${(p) => p.theme.spacing(3)};
    border-radius: ${(p) => p.theme.radius.md};
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(2)};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    opacity: ${(p) => (p.visible ? 1 : 0)};
    transform: scale(${(p) => (p.visible ? 1 : 0.8)});
    transition: opacity 0.3s ease, transform 0.3s ease;
`;

const Input = styled.input`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
`;

const TextArea = styled.textarea`
    padding: ${(p) => p.theme.spacing(1)};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.sm};
    min-height: 80px;
    resize: vertical;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${(p) => p.theme.spacing(1)};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
    padding: 6px 14px;
    border-radius: ${(p) => p.theme.radius.sm};
    border: 1px solid
        ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.border)};
    background: ${(p) => (p.variant === "primary" ? p.theme.colors.accent : p.theme.colors.surface)};
    color: ${(p) => (p.variant === "primary" ? "#fff" : p.theme.colors.text)};
    cursor: pointer;
`;

type TaskModalProps = {
    task: Task;
    onSave: (id: string, title: string, description: string) => void;
    onClose: () => void;
};

export const TaskModal = (p: TaskModalProps) => {
    const [title, setTitle] = useState(p.task.title);
    const [description, setDescription] = useState(p.task.description ?? "");
    const [visible, setVisible] = useState(false);

    // закрытие по Esc
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setVisible(false);
                setTimeout(p.onClose, 300);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [p]);

    // если пришёл другой task — обновляем локальные поля
    useEffect(() => {
        setTitle(p.task.title ?? "");
        setDescription(p.task.description ?? "");
    }, [p.task]);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(t);
    }, []);

    return (
        <Overlay
            visible={visible}
            onClick={() => {
                // закрываем при клике на фон
                setVisible(false);
                setTimeout(p.onClose, 300);
            }}
        >
            <Modal
                visible={visible}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Редактирование задачи</h2>

                <Input
                    placeholder="Название задачи"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <TextArea
                    placeholder="Описание задачи"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                />
                <Actions>
                    <Button
                        onClick={() => {
                            setVisible(false);
                            setTimeout(p.onClose, 300);
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (title.trim() !== "") {
                                p.onSave(p.task.id, title.trim(), description.trim());
                                setVisible(false);
                                setTimeout(p.onClose, 300);
                            }
                        }}
                    >
                        Сохранить
                    </Button>
                </Actions>
            </Modal>
        </Overlay>
    );
};
