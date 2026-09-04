import type { Teacher } from '@/types/teacher'

// ============================================================
// STATIC TEACHER DATA
// Colleges:
// 1. MGM College of Computer Science & Information Technology
// 2. MGM College of Commerce
// Photo is optional.
// ============================================================

export const teachers: Teacher[] = [
  {
    id: 'teacher-001',
    slug: 'anita-sharma',
    name: 'Prof. Anita Sharma',
    shortName: 'Prof. Sharma',
    subject: 'Computer Science & IT',
    designation: 'Assistant Professor',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop',
    quote: 'She taught us that curiosity is not a distraction — it is the beginning of everything.',
    heroMessage: 'FOR A TEACHER WHO MADE US THINK',
    personalizedMessage: `Dear Professor,

There are teachers who explain the syllabus, and then there are teachers who explain life. You were the latter.

In every class you walked into, you brought something beyond the textbook — a question worth asking, a perspective worth considering, a moment worth sitting with.

You never made us feel small for not knowing. You made us feel brave for trying to learn.

Thank you for every correction that stung a little, because it meant you believed we could do better. Thank you for every word of encouragement that arrived exactly when we needed it.

Your influence does not stay inside these walls. It travels with us.`,
    closingMessage: 'Thank you for every lesson that became a memory we carry with us.',
    theme: 'burgundy',
    memories: [
      {
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
        caption: 'One of those unforgettable classroom moments.',
        date: 'March 2025',
      },
      {
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop',
        caption: 'Where learning became a memory.',
        date: 'January 2025',
      },
      {
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format&fit=crop',
        caption: 'Every great question started here.',
        date: 'November 2024',
      },
    ],
    studentMessages: [
      {
        message: 'You made Computer Science feel like an art form. Thank you for making us fall in love with problem-solving.',
        author: 'Your CS students',
      },
      {
        message: 'Your patience with our doubts — even the silly ones — meant the world to us.',
        author: 'Batch of 2026',
      },
      {
        message: 'Thank you for always staying back to explain concepts until each of us understood.',
        author: 'Front Row Students',
      },
    ],
    envelopeMessages: [
      'You are the reason we believe we belong in tech. Thank you!',
      'We secretly looked forward to your practical lectures every week.',
      'Your lessons will stay with us long after we graduate from college.',
      'A true mentor who inspired our minds and touched our hearts.',
    ],
    classInfo: {
      class: 'B.Sc. / B.C.A. (CS & IT)',
      department: 'Department of Computer Science',
      college: 'MGM College of Computer Science & Information Technology',
      years: '2023–2026',
    },
  },

  {
    id: 'teacher-002',
    slug: 'rahul-patil',
    name: 'Prof. Rahul Patil',
    shortName: 'Prof. Patil',
    subject: 'Financial Accounting & Commerce',
    designation: 'Associate Professor',
    // Photo not provided to demonstrate text-based / wish-based hero
    photo: '',
    quote: 'He showed us that behind every balance sheet lies discipline, vision, and truth.',
    heroMessage: 'FOR A TEACHER WHO GUIDED OUR STEPS',
    personalizedMessage: `Dear Professor,

Balancing ledgers was easy; balancing life, dreams, and ethics was what you truly taught us.

In every lecture at MGM College of Commerce, your quiet warmth, crisp explanations, and genuine encouragement gave us the confidence to aim higher.

You taught us that hard work never goes in vain and that sincerity is the greatest currency of character.

We wish you a very Happy Teachers' Day, filled with good health, joy, and the pride of having shaped so many futures.`,
    closingMessage: 'With immense respect and gratitude for your mentorship.',
    theme: 'navy',
    memories: [],
    studentMessages: [
      {
        message: 'Commerce made complete sense only when you taught it. Thank you for your guidance!',
        author: 'Commerce Batch',
      },
      {
        message: 'Your dedication to every student in class has left a lifelong impression on us.',
        author: 'A grateful student',
      },
      {
        message: 'Happy Teachers\' Day, Sir! May you continue inspiring generations of students.',
        author: 'M.Com Students',
      },
    ],
    envelopeMessages: [
      'Thank you for always greeting us with a warm smile each morning.',
      'You made complex accounts look effortless and fascinating.',
      'We are proud to have been taught by you at MGM College of Commerce.',
    ],
    classInfo: {
      class: 'B.Com / M.Com',
      department: 'Department of Commerce',
      college: 'MGM college of Commerce',
      years: '2023–2026',
    },
  },

  {
    id: 'teacher-003',
    slug: 'priya-joshi',
    name: 'Prof. Priya Joshi',
    shortName: 'Prof. Joshi',
    subject: 'Information Technology & Data Systems',
    designation: 'Assistant Professor',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop',
    quote: 'She didn’t just teach technology; she taught us how to think critically and create with empathy.',
    heroMessage: 'FOR A TEACHER WHO GAVE US A VISION',
    personalizedMessage: `Dear Professor,

Technology changes by the minute, but the foundations you laid in us will last a lifetime.

Thank you for answering our endless questions, guiding us through projects, and teaching us the value of perseverance.

We are truly blessed to have you as our mentor at MGM College of Computer Science & Information Technology.

Happy Teachers' Day!`,
    closingMessage: 'For inspiring our minds and sparking our ambitions.',
    theme: 'forest',
    memories: [
      {
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop',
        caption: 'Project reviews and tech discussions in the lab.',
        date: 'January 2025',
      },
      {
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop',
        caption: 'Team collaboration and milestone celebrations.',
        date: 'February 2025',
      },
    ],
    studentMessages: [
      {
        message: 'Thank you for believing in our project ideas even when they seemed impossible.',
        author: 'IT Project Team',
      },
      {
        message: 'You made our college days full of learning and curiosity.',
        author: 'Your students',
      },
    ],
    envelopeMessages: [
      'Your encouragement gave us the confidence to pursue careers in IT.',
      'Thank you for being both a great professor and a caring guide.',
    ],
    classInfo: {
      class: 'B.Sc. IT / M.Sc. IT',
      department: 'Department of Information Technology',
      college: 'MGM College of Computer Science & Information Technology',
      years: '2023–2026',
    },
  },
]

const STORAGE_KEY = 'teachers_day_data_2026'

export function getTeacherBySlug(slug: string): Teacher | undefined {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const savedTeachers: Teacher[] = JSON.parse(saved)
      const found = savedTeachers.find((t) => t.slug === slug)
      if (found) return found
    }
  } catch (e) {
    console.error('Error reading from localStorage', e)
  }
  return teachers.find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const savedTeachers: Teacher[] = JSON.parse(saved)
      return savedTeachers.map((t) => t.slug)
    }
  } catch (e) {
    console.error('Error reading from localStorage', e)
  }
  return teachers.map((t) => t.slug)
}
