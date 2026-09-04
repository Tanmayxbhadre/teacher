import { useState } from 'react'
import { Plus, Trash2, Save, X, Image as ImageIcon } from 'lucide-react'
import type { Teacher, TeacherTheme, StudentMessage, Memory } from '@/types/teacher'

interface TeacherEditorProps {
  initialTeacher?: Teacher
  onSave: (teacher: Teacher) => void
  onCancel: () => void
}

export function TeacherEditor({ initialTeacher, onSave, onCancel }: TeacherEditorProps) {
  const [formData, setFormData] = useState<Teacher>(() => {
    if (initialTeacher) return { ...initialTeacher }
    return {
      id: `teacher-${Date.now()}`,
      slug: '',
      name: '',
      shortName: '',
      subject: '',
      designation: '',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop',
      quote: 'Teaching is not just about what is taught, but who is inspired along the way.',
      heroMessage: 'WITH ETERNAL GRATITUDE',
      personalizedMessage: `Dear Teacher,\n\nThank you for guiding our footsteps and expanding our horizons. Your patience and dedication continue to shape who we are today.\n\nEvery day you spent teaching was a day spent building our future.`,
      closingMessage: 'Thank you for every lesson that became a memory we carry with us.',
      theme: 'burgundy' as TeacherTheme,
      memories: [
        {
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
          caption: 'Cherished memories in class.',
          date: '2025',
        },
      ],
      studentMessages: [
        {
          message: 'Thank you for always believing in us even when we doubted ourselves.',
          author: 'Your students',
        },
      ],
      envelopeMessages: [
        'You always noticed when one of us needed a kind word.',
        'Thank you for being patient when we asked endless questions.',
        'Your lessons will stay with us long after graduation.',
      ],
      classInfo: {
        class: 'Final Year Batch',
        department: 'Academics',
        college: 'University Campus',
        years: '2023–2026',
      },
    }
  })

  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'memories' | 'envelopes'>('profile')

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/^(prof\.|dr\.|mr\.|mrs\.|ms\.)\s*/i, '')
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug && initialTeacher ? prev.slug : slug,
      shortName: prev.shortName || (name.startsWith('Prof.') || name.startsWith('Dr.') ? name.split(' ')[0] + ' ' + name.split(' ').slice(-1)[0] : name),
    }))
  }

  // Student Messages helpers
  const handleAddMessage = () => {
    setFormData((prev) => ({
      ...prev,
      studentMessages: [...prev.studentMessages, { message: '', author: '' }],
    }))
  }

  const handleUpdateMessage = (index: number, field: keyof StudentMessage, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.studentMessages]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, studentMessages: updated }
    })
  }

  const handleRemoveMessage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      studentMessages: prev.studentMessages.filter((_, i) => i !== index),
    }))
  }

  // Envelope Messages helpers
  const handleAddEnvelope = () => {
    setFormData((prev) => ({
      ...prev,
      envelopeMessages: [...prev.envelopeMessages, ''],
    }))
  }

  const handleUpdateEnvelope = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.envelopeMessages]
      updated[index] = value
      return { ...prev, envelopeMessages: updated }
    })
  }

  const handleRemoveEnvelope = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      envelopeMessages: prev.envelopeMessages.filter((_, i) => i !== index),
    }))
  }

  // Memories helpers
  const handleAddMemory = () => {
    setFormData((prev) => ({
      ...prev,
      memories: [
        ...prev.memories,
        {
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
          caption: '',
          date: '',
        },
      ],
    }))
  }

  const handleUpdateMemory = (index: number, field: keyof Memory, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.memories]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, memories: updated }
    })
  }

  const handleRemoveMemory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      memories: prev.memories.filter((_, i) => i !== index),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      callback(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter a teacher name')
      return
    }
    if (!formData.slug.trim()) {
      alert('Please enter a URL slug')
      return
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/70">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {initialTeacher ? `Edit ${initialTeacher.name}` : 'Add New Teacher'}
            </h2>
            <p className="text-xs text-gray-500">
              Configure personal details, memories, and secret surprises
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 px-6 gap-6 bg-white text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile & Theme
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Letter & Notes ({formData.studentMessages.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('memories')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'memories'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Memory Gallery ({formData.memories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('envelopes')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'envelopes'
                ? 'border-gray-900 text-gray-900 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Envelopes ({formData.envelopeMessages.length})
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Prof. Anita Sharma"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Short Name (for running text)
                  </label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g. Prof. Sharma"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    URL Slug * (Used for /teacher/[slug])
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-lg text-xs text-gray-500">
                      /teacher/
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="anita-sharma"
                      className="w-full px-3 py-2 border rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Designation & Subject
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="Assistant Professor"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Computer Science"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Theme selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Color Palette Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'burgundy', name: 'Burgundy & Gold', color: '#6F263D', sub: '#B8955A' },
                    { id: 'forest', name: 'Forest & Earth', color: '#2D5016', sub: '#8B7355' },
                    { id: 'navy', name: 'Deep Navy & Slate', color: '#1B2C5E', sub: '#7C9EB2' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme: t.id as TeacherTheme })}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        formData.theme === t.id
                          ? 'border-gray-900 ring-2 ring-gray-900/10 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex -space-x-1">
                        <span
                          className="w-4 h-4 rounded-full border border-white"
                          style={{ backgroundColor: t.color }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white"
                          style={{ backgroundColor: t.sub }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-800">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Portrait Photo URL or Upload
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm flex-shrink-0"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop'
                    }}
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="https://... or upload"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <label className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 cursor-pointer transition-colors whitespace-nowrap">
                      Upload File
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, (base64) => setFormData({ ...formData, photo: base64 }))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Hero quote & eyebrow */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Hero Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroMessage}
                    onChange={(e) => setFormData({ ...formData, heroMessage: e.target.value })}
                    placeholder="FOR A TEACHER WHO MADE US THINK"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Hero Quote
                  </label>
                  <input
                    type="text"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="A memorable line about this teacher"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Class info */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Class / Institution Details</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={formData.classInfo?.class || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classInfo: { ...formData.classInfo!, class: e.target.value },
                      })
                    }
                    placeholder="Batch (e.g. B.Tech CS)"
                    className="px-2.5 py-1.5 border rounded-md text-xs"
                  />
                  <input
                    type="text"
                    value={formData.classInfo?.department || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classInfo: { ...formData.classInfo!, department: e.target.value },
                      })
                    }
                    placeholder="Department"
                    className="px-2.5 py-1.5 border rounded-md text-xs"
                  />
                  <input
                    type="text"
                    value={formData.classInfo?.college || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classInfo: { ...formData.classInfo!, college: e.target.value },
                      })
                    }
                    placeholder="College / School"
                    className="px-2.5 py-1.5 border rounded-md text-xs"
                  />
                  <input
                    type="text"
                    value={formData.classInfo?.years || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        classInfo: { ...formData.classInfo!, years: e.target.value },
                      })
                    }
                    placeholder="Years (e.g. 2023–2026)"
                    className="px-2.5 py-1.5 border rounded-md text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Personalized Letter (Editorial Long-Form)
                </label>
                <textarea
                  rows={6}
                  value={formData.personalizedMessage}
                  onChange={(e) => setFormData({ ...formData, personalizedMessage: e.target.value })}
                  placeholder="Dear Professor, ..."
                  className="w-full p-3 border rounded-lg text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Closing Final Message
                </label>
                <input
                  type="text"
                  value={formData.closingMessage}
                  onChange={(e) => setFormData({ ...formData, closingMessage: e.target.value })}
                  placeholder="Thank you for every lesson..."
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Student Messages List */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-800">
                    Individual Student Messages ({formData.studentMessages.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMessage}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                  >
                    <Plus size={14} />
                    <span>Add Note</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.studentMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-3"
                    >
                      <div className="flex-1 space-y-2">
                        <textarea
                          rows={2}
                          value={msg.message}
                          onChange={(e) => handleUpdateMessage(idx, 'message', e.target.value)}
                          placeholder="Heartfelt message from student..."
                          className="w-full px-2.5 py-1.5 text-xs bg-white border rounded focus:outline-none focus:ring-1 focus:ring-gray-900"
                        />
                        <input
                          type="text"
                          value={msg.author}
                          onChange={(e) => handleUpdateMessage(idx, 'author', e.target.value)}
                          placeholder="Student Name / Attribution"
                          className="w-full px-2.5 py-1 text-xs bg-white border rounded focus:outline-none focus:ring-1 focus:ring-gray-900"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMessage(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEMORIES TAB */}
          {activeTab === 'memories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Photos showcased in the parallax editorial gallery
                </p>
                <button
                  type="button"
                  onClick={handleAddMemory}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                >
                  <Plus size={14} />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.memories.map((mem, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl relative flex flex-col gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveMemory(idx)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="h-28 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {mem.image ? (
                        <img
                          src={mem.image}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={24} className="text-gray-400" />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={mem.image}
                        onChange={(e) => handleUpdateMemory(idx, 'image', e.target.value)}
                        placeholder="Image URL or upload"
                        className="w-full px-2 py-1 text-xs bg-white border rounded"
                      />
                      <label className="flex items-center justify-center px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-xs font-medium text-gray-700 cursor-pointer transition-colors whitespace-nowrap">
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, (base64) => handleUpdateMemory(idx, 'image', base64))}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={mem.caption}
                        onChange={(e) => handleUpdateMemory(idx, 'caption', e.target.value)}
                        placeholder="Caption"
                        className="px-2 py-1 text-xs bg-white border rounded"
                      />
                      <input
                        type="text"
                        value={mem.date || ''}
                        onChange={(e) => handleUpdateMemory(idx, 'date', e.target.value)}
                        placeholder="Date (e.g. Feb 2025)"
                        className="px-2 py-1 text-xs bg-white border rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENVELOPES TAB */}
          {activeTab === 'envelopes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Folded interactive letters that teachers tap to unfold
                </p>
                <button
                  type="button"
                  onClick={handleAddEnvelope}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                >
                  <Plus size={14} />
                  <span>Add Letter</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.envelopeMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3"
                  >
                    <span className="text-xs font-mono font-bold text-gray-400 w-6">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={msg}
                      onChange={(e) => handleUpdateEnvelope(idx, e.target.value)}
                      placeholder="Secret message hidden in this envelope..."
                      className="flex-1 px-2.5 py-1.5 text-xs bg-white border rounded focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveEnvelope(idx)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-black transition-colors shadow-sm"
            >
              <Save size={14} />
              <span>Save Teacher</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
