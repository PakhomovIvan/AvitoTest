import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Ads from './Common/Components/Ads'
import MainLayout from './Layouts/MainLayout'
import AdsForm from './Pages/AdsForm/AdsForm'
import AdsList from './Pages/AdsList/AdsList'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
import Spinner from './Shared/spinner/Spinner'
import ShowToast from './Shared/toast/ShowToast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<AdsList />} />
          <Route path="/item/:id" element={<Ads />} />
          <Route path="/form" element={<AdsForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Spinner />
      <ShowToast />
    </BrowserRouter>
  )
}

export default App
