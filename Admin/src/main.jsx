import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from "./context/AdminContext.jsx";
import EmpContextProvider from "./context/EmpContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <EmpContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </EmpContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
