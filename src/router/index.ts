import { createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
// import AuthGuardComponent from "@/components/AuthGuardComponent"
const Counter = lazy(() => import("@/features/counter/Counter"))
const Quotes = lazy(() => import("@/features/quotes/Quotes"))

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Counter,
    },
    {
      path: "/quotes",
      Component: Quotes,
    },
    {
      path: "/403",
      element: "当前未授权",
    },
    {
      path: "*",
      element: "错误页",
    },
  ],
  {
    basename: "/",
  },
)

export default router
