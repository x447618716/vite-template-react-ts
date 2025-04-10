import { useLocation, useNavigate } from "react-router"
import type { LazyExoticComponent } from "react"
import { Suspense, useEffect } from "react"
import type { JSX } from "react/jsx-runtime"
import KeepAlive from "react-activation"

export default function withAuthentication(
  WrappedComponent: LazyExoticComponent<() => JSX.Element>,
) {
  return () => {
    const navigate = useNavigate()
    let location = useLocation()
    useEffect(() => {
      // Todo navigate("/403", { replace: true })
    }, [navigate, location])

    return (
      <KeepAlive>
        <Suspense fallback={<div>加载中···</div>}>
          <WrappedComponent />
        </Suspense>
      </KeepAlive>
    )
  }
}
