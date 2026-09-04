// ============================================================
// TEACHER DATA MODEL
// ============================================================

export interface Memory {
  image: string
  caption: string
  date?: string
}

export interface StudentMessage {
  message: string
  author: string
}

export interface ClassInfo {
  class: string
  department: string
  college: string
  years: string
}

export type TeacherTheme = 'burgundy' | 'forest' | 'navy'

export interface Teacher {
  id: string
  slug: string
  name: string
  shortName: string          // "Prof. Sharma" — for use in running text
  subject: string
  designation: string
  photo?: string             // Optional: if available good, if not available simply wish
  quote: string              // Hero section quote
  heroMessage: string        // "WITH GRATITUDE" eyebrow context
  personalizedMessage: string
  closingMessage: string
  theme: TeacherTheme
  memories: Memory[]
  studentMessages: StudentMessage[]
  envelopeMessages: string[] // Secret messages in the envelope section
  classInfo?: ClassInfo
}
