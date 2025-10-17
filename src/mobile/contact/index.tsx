import { Icon } from '@/components/Icon'
import useBreakpoints from '@/hooks/useBreakpoints'
import useData from '@/hooks/useData'

export default function ContactLayout() {
  const { aboutMe } = useData()
  const size = useBreakpoints()
  return (
    <div data-section className="flex w-full flex-col items-center gap-y-16">
      <div className="flex w-full flex-row items-center gap-x-4">
        <div className="h-[1px] flex-1 bg-gray-700" />
        <h2 className="heading-h2 text-center">Contact</h2>
        <div className="h-[1px] flex-1 bg-gray-700" />
      </div>
      <div className="grid grid-cols-[auto_70%] items-center justify-center gap-x-8 gap-y-8 text-gray-400">
        <Icon name="email" size={size === 'small' ? 32 : 48} color="currentColor" />
        <a href={`mailto:${aboutMe.email}`} className="link-normal text-center text-lg">
          {aboutMe.email}
        </a>
        <Icon name="linkedin" size={size === 'small' ? 32 : 48} color="currentColor" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={aboutMe.linkedin}
          className="link-normal text-center text-lg"
        >
          {aboutMe.linkedin}
        </a>
        <Icon name="github" size={size === 'small' ? 32 : 48} color="currentColor" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={aboutMe.github}
          className="link-normal text-center text-lg"
        >
          {aboutMe.github}
        </a>
      </div>
    </div>
  )
}
