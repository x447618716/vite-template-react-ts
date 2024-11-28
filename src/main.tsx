import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { AliveScope } from "react-activation"
import { ErrorBoundary } from "react-error-boundary"
import App from "./App"
import { persistor, store } from "./stores"
import { PersistGate } from "redux-persist/integration/react"
import { ConfigProvider, DotLoading } from "antd-mobile"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import "./i18n"
import "./index.css"
import "antd-mobile/bundle/css-vars-patch.css"

dayjs.locale("zh-CN-cn")

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <pre className="text-red-700">{error.message}</pre>
            )}>
            <Suspense fallback={<DotLoading />}>
              <AliveScope>
                <App />
              </AliveScope>
            </Suspense>
          </ErrorBoundary>
        </ConfigProvider>
      </PersistGate>
    </Provider>,
    // </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
