export type Task = {
    readonly id: string;     // уникальный идентификатор
    title: string;           // текст задачи
    description?: string;    // новое поле
    completed: boolean;      // статус выполнения
    createdAt: Date;         // дата создания
};

export function makeTask(title: string): Task {
    return {
        id: Math.random().toString(36).slice(2, 9),
        title: title.trim(),
        description: "",
        completed: false,
        createdAt: new Date(),
    };
}
