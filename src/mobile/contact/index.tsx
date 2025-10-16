import { Icon } from '@/components/Icon'
import useData from '@/hooks/useData'

export default function ContactLayout() {
  const { aboutMe } = useData()
  return (
    <div data-section className="flex w-full flex-col items-center gap-y-16">
      <div className="flex w-full flex-row items-center gap-x-4">
        <div className="h-[1px] flex-1 bg-gray-700" />
        <h2 className="heading-h2 text-center">Contact</h2>
        <div className="h-[1px] flex-1 bg-gray-700" />
      </div>
      <div className="grid grid-cols-[auto_70%] items-center justify-center gap-x-8 gap-y-8">
        <Icon name="email" size={48} color="white" />
        <a href={`mailto:${aboutMe.email}`} className="link-normal text-center text-lg">
          {aboutMe.email}
        </a>
        <Icon name="linkedin" size={48} color="white" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={aboutMe.linkedin}
          className="link-normal text-center text-lg"
        >
          {aboutMe.linkedin}
        </a>
        <Icon name="github" size={48} color="white" />
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
