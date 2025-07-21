import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from '@/pages/login'
import HomePage from '@/pages/HomePage'
import NotFound from '@/pages/NotFound'
import MyPage from '@/pages/MyPage'
import OrderPage from '@/pages/OrderPage'
import { AuthProvider } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'
import PageWrapper from '@/components/PageWrapper'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageWrapper>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={
              <AuthGuard>
                <MyPage />
              </AuthGuard>
            } />
            <Route path="/order/:productId" element={
              <AuthGuard>
                <OrderPage />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

