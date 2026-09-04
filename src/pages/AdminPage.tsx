import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  QrCode,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Printer,
  ArrowLeft,
  Lock,
  RotateCcw,
  GraduationCap,
} from 'lucide-react'
import { getTeachers, saveTeacher, deleteTeacher } from '@/lib/db'

const AUTH_KEY = 'teachers_day_admin_authenticated'

export function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true'
  })
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState(false)

  // Teachers data state
  const [teacherList, setTeacherList] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Modals state
  const [selectedQRTeacher, setSelectedQRTeacher] = useState<Teacher | null>(null)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [showBatchPrint, setShowBatchPrint] = useState(false)

  // Fetch teachers from DB
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const data = await getTeachers()
      setTeacherList(data)
      setIsLoading(false)
    }
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Passcode "teachers2026" or "admin"
    if (passcode.trim() === 'teachers2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, 'true')
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_KEY)
  }

  const handleSaveTeacher = async (saved: Teacher) => {
    const success = await saveTeacher(saved)
    if (success) {
      setTeacherList((prev) => {
        const exists = prev.some((t) => t.id === saved.id)
        if (exists) {
          return prev.map((t) => (t.id === saved.id ? saved : t))
        }
        return [saved, ...prev]
      })
    } else {
      alert("Failed to save teacher to database. Check console for details.")
    }
    setEditingTeacher(null)
    setIsCreating(false)
  }

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const success = await deleteTeacher(id)
      if (success) {
        setTeacherList((prev) => prev.filter((t) => t.id !== id))
      } else {
        alert("Failed to delete teacher from database.")
      }
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    const data = await getTeachers()
    setTeacherList(data)
    setIsLoading(false)
  }

  // If not authenticated, render login gate
  if (!isAuthenticated) {
    return (
      <main
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-black/10 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
            <Lock size={22} />
          </div>

          <h1
            className="text-2xl font-normal mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 mb-6 font-sans">
            Teachers' Day 2026 QR & Profile Management
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setAuthError(false)
                }}
                placeholder="Enter passcode (teachers2026)"
                className="w-full px-4 py-2.5 text-center text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono tracking-widest"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-500 mt-1.5">Incorrect passcode. Try "teachers2026"</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl bg-gray-900 text-white hover:bg-black transition-colors"
            >
              Access Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-700 transition-colors">
              ← Return Home
            </Link>
            <button
              onClick={() => {
                setIsAuthenticated(true)
                localStorage.setItem(AUTH_KEY, 'true')
              }}
              className="hover:underline text-gray-500"
            >
              Quick Demo Access
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen pb-20"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Return to Home"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-700">
                ADMINISTRATION
              </span>
              <h1
                className="text-lg font-medium leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Teachers' Day QR Experience
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBatchPrint(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
            >
              <Printer size={14} />
              <span>Print All Badges</span>
            </button>

            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-black shadow-sm transition-colors"
            >
              <Plus size={14} />
              <span>Add Teacher</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-gray-800 transition-colors ml-2"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Banner summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-black/5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">Total Teachers</p>
            <p className="text-3xl font-light mt-1 font-serif">{teacherList.length}</p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-black/5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">Interactive Envelopes</p>
            <p className="text-3xl font-light mt-1 font-serif">
              {teacherList.reduce((acc, t) => acc + t.envelopeMessages.length, 0)}
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-black/5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">Student Messages</p>
            <p className="text-3xl font-light mt-1 font-serif">
              {teacherList.reduce((acc, t) => acc + t.studentMessages.length, 0)}
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Event Date</p>
              <p className="text-sm font-semibold mt-1">5 September 2026</p>
            </div>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-900 transition-colors mt-2"
            >
              <RotateCcw size={12} className={isLoading ? "animate-spin" : ""} />
              <span>{isLoading ? "Syncing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl font-light text-gray-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Active Teacher Gift Pages
            </h2>
            <span className="text-xs text-gray-500">
              Unique QR codes are generated dynamically for each slug
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherList.map((teacher) => {
              const themeColor =
                teacher.theme === 'forest'
                  ? '#2D5016'
                  : teacher.theme === 'navy'
                  ? '#1B2C5E'
                  : '#6F263D'

              return (
                <div
                  key={teacher.id}
                  className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Teacher Card Header */}
                    <div className="p-5 flex items-start gap-4">
                      {teacher.photo ? (
                        <img
                          src={teacher.photo}
                          alt={teacher.name}
                          className="w-16 h-16 rounded-xl object-cover border border-black/10 shadow-sm flex-shrink-0"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop'
                          }}
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-xl border border-black/10 shadow-sm flex-shrink-0 flex items-center justify-center bg-amber-50"
                          style={{ color: themeColor }}
                        >
                          <GraduationCap size={28} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: themeColor }}
                            title={`Theme: ${teacher.theme}`}
                          />
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                            {teacher.theme}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-medium text-gray-900 truncate"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {teacher.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {teacher.designation} • {teacher.subject}
                        </p>
                        {teacher.classInfo?.college && (
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {teacher.classInfo.college}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Metadata pill list */}
                    <div className="px-5 pb-4 flex flex-wrap gap-2 text-[11px] text-gray-600">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md">
                        {teacher.memories.length} Photos
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md">
                        {teacher.studentMessages.length} Messages
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md">
                        {teacher.envelopeMessages.length} Envelopes
                      </span>
                    </div>

                    <div className="px-5 pb-4">
                      <p className="text-xs text-gray-500 font-mono truncate bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-200">
                        /teacher/{teacher.slug}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="border-t border-gray-100 p-3 bg-gray-50/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedQRTeacher(teacher)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-2xs"
                        title="View & Download QR Badge"
                      >
                        <QrCode size={13} />
                        <span>QR Badge</span>
                      </button>

                      <Link
                        to={`/teacher/${teacher.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-2xs"
                        title="Preview Live Page"
                      >
                        <ExternalLink size={13} />
                        <span>Preview</span>
                      </Link>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingTeacher(teacher)}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Edit Teacher"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Teacher"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* QR Badge Modal */}
      {selectedQRTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative">
            <QRCodeCard
              teacher={selectedQRTeacher}
              onClose={() => setSelectedQRTeacher(null)}
            />
          </div>
        </div>
      )}

      {/* Teacher Editor Modal (Create or Edit) */}
      {(editingTeacher || isCreating) && (
        <TeacherEditor
          initialTeacher={editingTeacher || undefined}
          onSave={handleSaveTeacher}
          onCancel={() => {
            setEditingTeacher(null)
            setIsCreating(false)
          }}
        />
      )}

      {/* Batch Print Modal */}
      {showBatchPrint && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto mb-8 print:hidden flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-bold">Print All QR Gift Badges</h2>
              <p className="text-xs text-gray-500">
                Ready to print keepsake badges for all {teacherList.length} teachers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold flex items-center gap-2"
              >
                <Printer size={16} />
                <span>Print All</span>
              </button>
              <button
                onClick={() => setShowBatchPrint(false)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
            {teacherList.map((teacher) => (
              <div key={teacher.id} className="page-break-inside-avoid">
                <QRCodeCard teacher={teacher} />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
