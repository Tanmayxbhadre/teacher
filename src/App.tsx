import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useSmoothScroll } from '@/animations/useSmoothScroll'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { HomePage } from '@/pages/HomePage'
import { TeacherPage } from '@/pages/TeacherPage'
import { AdminPage } from '@/pages/AdminPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  // Initialize Lenis smooth scroll
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/:slug" element={<TeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
