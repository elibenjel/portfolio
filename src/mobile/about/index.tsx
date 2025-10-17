import { description } from '@/constants'
import Skills from '@/desktop/about/Skills'
import useData from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

export default function AboutLayout() {
  const { aboutMe } = useData()
  const { language } = useLocalization()
  return (
    <div className="flex flex-col items-center gap-y-16">
      <div data-section className="flex w-full flex-col items-center rounded-md bg-gray-200 py-8">
        <div className="aspect-square h-[calc(min(50vw,30vh))] overflow-hidden rounded-full">
          <img src="media/me.jpg" alt="Me" className="h-full w-full object-cover object-[50%_2%]" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="heading-h2 text-center text-gray-800">{aboutMe.name}</h2>
          <h3 className="heading-h3 text-center text-gray-800">{aboutMe.country}</h3>
        </div>
      </div>
      <div data-section className="flex flex-1 flex-col items-center gap-y-8">
        <h2 className="heading-h2 text-center">{aboutMe.titles.join(' - ')}</h2>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex w-full flex-row items-center gap-x-4">
              <div className="h-[1px] flex-1 bg-gray-700" />
              <p className="paragraph-normal scale-120 text-center font-bold">
                {description[language].whoami}
              </p>
              <div className="h-[1px] flex-1 bg-gray-700" />
            </div>
            <p className="paragraph-normal text-center">{aboutMe.description.whoami}</p>
          </div>
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex w-full flex-row items-center gap-x-4">
              <div className="h-[1px] flex-1 bg-gray-700" />
              <p className="paragraph-normal scale-120 text-center font-bold">
                {description[language].lookingfor}
              </p>
              <div className="h-[1px] flex-1 bg-gray-700" />
            </div>
            <p className="paragraph-normal text-center">{aboutMe.description.lookingfor}</p>
          </div>
        </div>
      </div>
      <div
        data-section
        className="flex w-full flex-col items-center gap-y-8 rounded-md bg-gray-200 p-8"
      >
        <Skills domain="web" skills={aboutMe.skills.web} variant="on-light" />
        <Skills domain="mobile" skills={aboutMe.skills.mobile} variant="on-light" />
        <Skills domain="backend&api" skills={aboutMe.skills['backend&api']} variant="on-light" />
        <Skills domain="databases" skills={aboutMe.skills.databases} variant="on-light" />
        <Skills domain="devops" skills={aboutMe.skills.devops} variant="on-light" />
        <Skills domain="soft" skills={aboutMe.skills.soft} variant="on-light" />
      </div>
    </div>
  )
}
