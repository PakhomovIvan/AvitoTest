import { PrimeReactProvider } from 'primereact/api'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './Stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
)
