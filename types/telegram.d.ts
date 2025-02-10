declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                    };
                };
                ready(): void;
                expand(): void;
                enableClosingConfirmation(): void;
                sendData(data: string): void;
                close(): void;
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                };
                MainButton: {
                    show(): void;
                    hide(): void;
                    setText(text: string): void;
                    onClick(callback: () => void): void;
                };
            };
        };
    }
}

export {};
