import { useLocation, useNavigate } from "react-router-dom"
import type { LazyExoticComponent } from "react"
import { Suspense, useEffect } from "react"
import type { JSX } from "react/jsx-runtime"
import KeepAlive from "react-activation"
import { DotLoading } from "antd-mobile"
import { getAccessToken } from "@/utils"

export default function withAuthentication(
  WrappedComponent: LazyExoticComponent<() => JSX.Element>,
) {
  return () => {
    const navigate = useNavigate()
    let location = useLocation()
    useEffect(() => {
      if (!getAccessToken()) {
        navigate("/403", { replace: true })
      }
    }, [navigate, location])

    return (
      <KeepAlive>
        <Suspense fallback={<DotLoading />}>
          <WrappedComponent />
        </Suspense>
      </KeepAlive>
    )
  }
}
