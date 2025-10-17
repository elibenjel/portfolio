import * as React from 'react'

import { description } from '@/constants'
import useData from '@/hooks/useData'
import useScrollState from '@/hooks/useScrollState'
import useLocalization from '@/providers/localization/hook'

import Skills from './Skills'

export default function AboutLayout() {
  const { aboutMe } = useData()
  const { language } = useLocalization()
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const { canScrollUp, canScrollDown } = useScrollState(scrollContainerRef)
  return (
    <div className="animate-grow flex h-full min-h-0 w-full min-w-0 flex-col justify-between px-8">
      <div className="flex h-[40%] min-h-[300px] w-full flex-row items-center gap-x-8">
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
        <div
          ref={scrollContainerRef}
          className={`scrollbar-styled flex h-full min-h-0 flex-1 flex-col items-center gap-y-8 overflow-y-auto px-4 ${canScrollUp && canScrollDown ? 'fade-vertical' : canScrollUp ? 'fade-up' : canScrollDown ? 'fade-down' : ''}`}
        >
          <h2 className="heading-h2 text-center">{aboutMe.titles.join(' - ')}</h2>
          <div className="flex max-w-[800px] flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex w-full flex-row items-center gap-x-4">
                <div className="h-[1px] flex-1 bg-gray-700" />
                <p className="text-normal scale-120 font-bold">{description[language].whoami}</p>
                <div className="h-[1px] flex-1 bg-gray-700" />
              </div>
              <p className="text-normal text-center">{aboutMe.description.whoami}</p>
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex w-full flex-row items-center gap-x-4">
                <div className="h-[1px] flex-1 bg-gray-700" />
                <p className="text-normal scale-120 font-bold">
                  {description[language].lookingfor}
                </p>
                <div className="h-[1px] flex-1 bg-gray-700" />
              </div>
              <p className="text-normal text-center">{aboutMe.description.lookingfor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="scrollbar-styled max-h-[50%] w-full gap-y-8 overflow-auto p-8">
        <div className="flex min-h-[280px] w-full min-w-[800px] flex-col justify-evenly gap-y-8">
          <div className="flex min-h-0 w-full min-w-[800px] flex-row gap-x-8">
            <Skills domain="web" skills={aboutMe.skills.web} />
            <Skills domain="mobile" skills={aboutMe.skills.mobile} />
            <Skills domain="backend&api" skills={aboutMe.skills['backend&api']} />
          </div>
          <div className="flex min-h-0 w-full min-w-[800px] flex-row gap-x-8">
            <Skills domain="databases" skills={aboutMe.skills.databases} />
            <Skills domain="devops" skills={aboutMe.skills.devops} />
            <Skills domain="soft" skills={aboutMe.skills.soft} />
          </div>
        </div>
      </div>
    </div>
  )
}
