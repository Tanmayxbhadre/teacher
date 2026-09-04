import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTeacherBySlug } from '@/data/teachers'
import { OpeningExperience } from '@/sections/OpeningExperience'
import { HeroSection } from '@/sections/HeroSection'
import { StorySection } from '@/sections/StorySection'
import { PersonalMessage } from '@/sections/PersonalMessage'
import { ValuesSection } from '@/sections/ValuesSection'
import { MemoryGallery } from '@/sections/MemoryGallery'
import { StudentMessages } from '@/sections/StudentMessages'
import { EnvelopeReveal } from '@/sections/EnvelopeReveal'
import { FinalSurprise } from '@/sections/FinalSurprise'
import { ClosingSection } from '@/sections/ClosingSection'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { NotFoundPage } from './NotFoundPage'

export function TeacherPage() {
  const { slug } = useParams<{ slug: string }>()
  const teacher = slug ? getTeacherBySlug(slug) : undefined
  const [opened, setOpened] = useState(false)

  if (!teacher) {
    return <NotFoundPage />
  }

  return (
    <>
      {/* Dynamic head SEO */}
      <title>{`Happy Teachers' Day, ${teacher.name} — 5 September 2026`}</title>

      {/* Apply teacher theme */}
      <div
        data-theme={teacher.theme}
        style={{ overflowX: 'hidden' }}
      >
        {/* Cinematic opening — removed from DOM after open */}
        {!opened && (
          <OpeningExperience
            teacherName={teacher.name}
            onOpen={() => setOpened(true)}
          />
        )}

        {/* Main experience — only rendered after opening */}
        {opened && (
          <main id="main-content">
            <ScrollProgress />
            <HeroSection teacher={teacher} isVisible={opened} />
            <StorySection />
            <PersonalMessage teacher={teacher} />
            <ValuesSection />
            {teacher.memories.length > 0 && (
              <MemoryGallery memories={teacher.memories} />
            )}
            <StudentMessages messages={teacher.studentMessages} />
            {teacher.envelopeMessages.length > 0 && (
              <EnvelopeReveal messages={teacher.envelopeMessages} />
            )}
            <FinalSurprise teacher={teacher} />
            <ClosingSection teacher={teacher} />
          </main>
        )}
      </div>
    </>
  )
}
