import { Icon } from '@/components/Icon'
import { useData } from '@/hooks/useData'

export default function Layout() {
  const { aboutMe } = useData()
  return (
    <div className="scrollbar-styled animate-fade-up flex h-full min-h-0 w-full items-center justify-center overflow-y-auto px-8">
      <div className="grid grid-cols-[auto_auto] items-center justify-center gap-x-8 gap-y-8 border-l border-gray-700 pl-8">
        <Icon name="email" size={48} color="white" />
        <a href={`mailto:${aboutMe.email}`} className="link-normal text-lg">
          {aboutMe.email}
        </a>
        <Icon name="linkedin" size={48} color="white" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={aboutMe.linkedin}
          className="link-normal text-lg"
        >
          {aboutMe.linkedin}
        </a>
        <Icon name="github" size={48} color="white" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={aboutMe.github}
          className="link-normal text-lg"
        >
          {aboutMe.github}
        </a>
      </div>
    </div>
  )
}
