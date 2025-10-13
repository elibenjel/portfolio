import * as React from 'react'

import Gauge from '@/components/Gauge'
import type { Journey } from '@/hooks/useData'
import useIsVisible from '@/hooks/useIsVisible'
import { colors } from '@/utils/styling'

type TechnicalSkill = Journey[number]['missions'][number]['technicalSkills'][number]
type SoftSkill = Journey[number]['missions'][number]['softSkills'][number]

export default function Skills({
  title,
  skills,
}: {
  title: string
  skills: (TechnicalSkill | SoftSkill)[]
}) {
  const pickColor = () => {
    const domain = Object.values(colors.accent)
    return domain[Math.floor(Math.random() * domain.length)]
  }

  const { ref: skillsRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  return (
    <div
      ref={skillsRef}
      className={`flex w-full flex-col items-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <h2 className="heading-h2 mb-8 w-full border-b border-gray-700 text-center">{title}</h2>
      <div className="grid w-full grid-cols-[max-content_auto_1fr] items-center gap-x-4 gap-y-4">
        {skills.map(skill => (
          <React.Fragment key={skill.label}>
            <h4 className="heading-h4 text-gray-400">{skill.label}</h4>
            <span className="text-gray-400">-</span>
            <Gauge percentage={Number(skill.value)} color={pickColor()} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
