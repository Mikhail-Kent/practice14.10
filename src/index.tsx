import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { TasksPage } from "./pages/tasks-page";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <ThemeProvider theme={theme}>
            <TasksPage />
        </ThemeProvider>
    );
}
