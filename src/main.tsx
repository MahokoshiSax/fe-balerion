import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CONFIG } from './config/google'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './components/theme-provider'
import Assignment2Page from './pages/Assignment2/Assignment2Page'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={GOOGLE_CONFIG.clientId}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}>
                  <Layout>
                    <HomePage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Routes>
            <Route
              path="/assign-2" 
              element={
                <Layout>
                  <Assignment2Page />
                </Layout>
              } 
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
