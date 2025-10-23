import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { AliveScope } from 'react-activation';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { persistor, store } from './stores';
import 'dayjs/locale/zh-cn';
import './i18n';
import './main.css';

dayjs.locale('zh-cn');

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        //<StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConfigProvider>
                        <ErrorBoundary fallbackRender={({ error }) => <pre className="text-red-700">{error.message}</pre>}>
                            <Suspense fallback={<div>加载中···</div>}>
                                <AliveScope>
                                    <App />
                                </AliveScope>
                            </Suspense>
                        </ErrorBoundary>
                    </ConfigProvider>
                </PersistGate>
            </Provider>
        //</StrictMode>
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
}
