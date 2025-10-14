import { useData } from '@/hooks/useData'
import { useLanguage } from '@/hooks/useLanguage'

import Skills from './Skills'

const description = {
  fr: {
    whoami: 'Je suis',
    lookingfor: 'Je recherche',
  },
  en: {
    whoami: 'I am',
    lookingfor: 'I am looking for',
  },
} as const

export default function Layout() {
  const { aboutMe } = useData()
  const { language } = useLanguage()
  return (
    <div className="scrollbar-styled animate-fade-in-scale flex h-full min-h-0 w-full flex-col justify-between overflow-y-auto px-8">
      <div className="flex h-[40%] min-h-[300px] w-full min-w-[1200px] flex-row items-center gap-x-8">
        <div className="flex h-full flex-col items-center rounded-md bg-gray-200 py-8">
          <div className="aspect-square overflow-hidden rounded-full">
            <img
              src="/media/me.jpg"
              alt="Me"
              className="h-full w-full object-cover object-[50%_2%]"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="heading-h2 text-black">{aboutMe.name}</h2>
            <h3 className="heading-h3 text-black">{aboutMe.country}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-8">
          <h2 className="heading-h2">{aboutMe.titles.join(' - ')}</h2>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex w-full flex-row items-center gap-x-4">
                <div className="h-[1px] flex-1 bg-gray-700" />
                <p className="text-normal scale-120 font-bold">{description[language].whoami}</p>
                <div className="h-[1px] flex-1 bg-gray-700" />
              </div>
              <p className="text-normal">{aboutMe.description.whoami}</p>
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex w-full flex-row items-center gap-x-4">
                <div className="h-[1px] flex-1 bg-gray-700" />
                <p className="text-normal scale-120 font-bold">
                  {description[language].lookingfor}
                </p>
                <div className="h-[1px] flex-1 bg-gray-700" />
              </div>
              <p className="text-normal">{aboutMe.description.lookingfor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[50%] min-h-[300px] w-full min-w-[1200px] flex-col justify-center gap-y-8">
        <div className="flex flex-row gap-x-8">
          <Skills domain="web" skills={aboutMe.skills.web} />
          <Skills domain="mobile" skills={aboutMe.skills.mobile} />
          <Skills domain="backend&api" skills={aboutMe.skills['backend&api']} />
        </div>
        <div className="flex flex-row gap-x-8">
          <Skills domain="databases" skills={aboutMe.skills.databases} />
          <Skills domain="devops" skills={aboutMe.skills.devops} />
          <Skills domain="soft" skills={aboutMe.skills.soft} />
        </div>
      </div>
    </div>
  )
}
