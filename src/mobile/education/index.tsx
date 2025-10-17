import * as React from 'react'

import useData from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

const localizations = {
  fr: {
    title: 'Formation',
  },
  en: {
    title: 'Education',
  },
}

export default function EducationLayout() {
  const { education } = useData()
  const { language } = useLocalization()
  return (
    <div data-section className="flex w-full flex-col items-center gap-y-16">
      <div className="flex w-full flex-row items-center gap-x-4">
        <div className="h-[1px] flex-1 bg-gray-700" />
        <h2 className="heading-h2 text-center">{localizations[language].title}</h2>
        <div className="h-[1px] flex-1 bg-gray-700" />
      </div>
      <div className="grid grid-cols-[auto] items-center justify-center space-y-12">
        {education.map(({ name, location, dates }, index) => (
          <React.Fragment key={name}>
            <div className="flex flex-col items-center gap-y-2">
              <h2 className="heading-h3 text-center">{name}</h2>
              <p className="text-center text-lg text-gray-400">
                <span className="capitalize">
                  {new Date(dates.start).toLocaleDateString(language, {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
                {' - '}
                <span className="capitalize">
                  {new Date(dates.end).toLocaleDateString(language, {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </p>
              <p className="text-center text-lg text-gray-400">{location}</p>
            </div>
            <div className="flex w-full flex-col items-center">
              {index < education.length - 1 && <div className="h-[1px] w-[50px] bg-gray-700" />}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
