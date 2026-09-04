import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, Printer, ExternalLink, X } from 'lucide-react'
import type { Teacher } from '@/types/teacher'

interface QRCodeCardProps {
  teacher: Teacher
  onClose?: () => void
}

export function QRCodeCard({ teacher, onClose }: QRCodeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const fullUrl = `${origin}/teacher/${teacher.slug}`

  // Download QR code as PNG
  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `teachers-day-qr-${teacher.slug}.png`
    link.href = url
    link.click()
  }

  // Trigger print dialog
  const handlePrint = () => {
    window.print()
  }

  const themeColors = {
    burgundy: { border: '#6F263D', text: '#6F263D', bg: '#FAF6F0' },
    forest: { border: '#2D5016', text: '#2D5016', bg: '#F5F7F2' },
    navy: { border: '#1B2C5E', text: '#1B2C5E', bg: '#F2F5F9' },
  }[teacher.theme] || { border: '#6F263D', text: '#6F263D', bg: '#FAF6F0' }

  return (
    <div className="flex flex-col items-center">
      {/* Control bar */}
      <div className="flex items-center justify-between w-full max-w-sm mb-4 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={downloadQRCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download size={14} />
            <span>Download QR</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={14} />
            <span>Print Badge</span>
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Printable Physical Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm p-8 text-center rounded-2xl shadow-xl border overflow-hidden"
        style={{
          backgroundColor: themeColors.bg,
          borderColor: 'rgba(0,0,0,0.12)',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Decorative corner borders */}
        <div
          className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2"
          style={{ borderColor: themeColors.border }}
        />
        <div
          className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2"
          style={{ borderColor: themeColors.border }}
        />
        <div
          className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2"
          style={{ borderColor: themeColors.border }}
        />
        <div
          className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2"
          style={{ borderColor: themeColors.border }}
        />

        {/* Header */}
        <div className="mb-4">
          <p
            className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-1"
            style={{ color: themeColors.text }}
          >
            TEACHERS' DAY • 5 SEPT 2026
          </p>
          <div
            className="w-8 h-[1px] mx-auto my-2 opacity-40"
            style={{ backgroundColor: themeColors.border }}
          />
          <h2
            className="text-2xl font-normal leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#1a1a1a',
            }}
          >
            {teacher.name}
          </h2>
          <p
            className="text-xs mt-0.5 tracking-wide text-gray-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {teacher.designation} • {teacher.subject}
          </p>
        </div>

        {/* QR Code Container */}
        <div
          ref={qrRef}
          className="p-4 bg-white rounded-xl shadow-sm inline-block my-3 border border-black/5"
        >
          <QRCodeCanvas
            value={fullUrl}
            size={180}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: '/favicon.ico',
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        {/* Instructions */}
        <p
          className="text-[11px] leading-relaxed text-gray-500 max-w-[240px] mx-auto mt-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scan with your phone camera to unlock your personalized digital gift.
        </p>

        {/* Footer info */}
        {teacher.classInfo && (
          <div
            className="mt-6 pt-4 border-t border-black/10 text-[10px] text-gray-400 uppercase tracking-wider"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>{teacher.classInfo.department}</p>
            <p className="mt-0.5 font-medium text-gray-500">
              {teacher.classInfo.college}
            </p>
          </div>
        )}

        {/* Interactive preview link for web view only */}
        <div className="mt-4 pt-2 print:hidden">
          <a
            href={`/teacher/${teacher.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
            style={{ color: themeColors.text }}
          >
            <span>Open Experience Link</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}
