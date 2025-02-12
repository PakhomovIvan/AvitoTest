import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MainLayout.scss'

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') navigate('/list', { replace: true })
  }, [navigate, location])

  return (
    <div className="wrapper">
      {/* Menu */}
      <div className="wrapper-outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
