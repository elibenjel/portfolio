import * as React from 'react'

import useData from '@/hooks/useData'
import useLocalization from '@/providers/localization/hook'

export default function EducationLayout() {
  const { education } = useData()
  const { language } = useLocalization()
  return (
    <div className="scrollbar-styled animate-grow flex h-full min-h-0 w-full flex-col items-center justify-center overflow-y-auto px-8">
      <div className="grid grid-cols-[auto] items-center justify-center space-y-12">
        {education.map(({ name, location, dates }, index) => (
          <React.Fragment key={name}>
            <div className="flex flex-col items-center gap-y-2">
              <h2 className="heading-h3">{name}</h2>
              <p className="text-lg text-gray-400">
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
              <p className="text-lg text-gray-400">{location}</p>
            </div>
            {index < education.length - 1 && <div className="h-[1px] w-full bg-gray-700" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
