import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/md-dark-indigo/theme.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import MainLayout from './Layouts/MainLayout'

import Ad from './Pages/Ad/Ad'
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
          <Route path="/item/:id" element={<Ad />} />
          <Route path="/list" element={<AdsList />} />
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
