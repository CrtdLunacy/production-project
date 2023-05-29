import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'app/providers/ThemeProvider/ui/ThemeProvider';
import App from 'app/App';
import 'app/styles/index.scss';

import './shared/config/i18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoudary/index';
import { StoreProvider } from 'app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать React-приложение');
}
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
