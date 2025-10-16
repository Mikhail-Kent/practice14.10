import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            surface: string;
            surfaceAlt: string;
            border: string;
            text: string;
            textMuted: string;
            accent: string;
        };
        spacing: (n: number) => string;
        radius: { sm: string; md: string };
    }
}
