import data from '~data'

import * as React from 'react'

import useLocalization from '@/providers/localization/hook'

export type MediaItem = {
  url: string
  type: 'image' | 'video'
}

export type Hyperlink = {
  url: string
  text: string
}

export type Journey = {
  id: string
  period: string
  dates: {
    start: string
    end: string | null
  }
  missions: {
    title: string
    problem: string
    solution: string
    result: string
    technicalSkills: {
      label: string
      value: string
    }[]
    softSkills: {
      label: string
      value: string
    }[]
    achievements: {
      hyperlinks: Hyperlink[]
      media: MediaItem[]
    }
  }[]
}[]

export type SkillDomain = 'web' | 'mobile' | 'backend&api' | 'databases' | 'devops' | 'soft'

export type AboutMe = {
  name: string
  age: number
  titles: string[]
  country: string
  email: string
  linkedin: string
  github: string
  description: {
    whoami: string
    lookingfor: string
  }
  skills: Record<SkillDomain, string[]>
}

export type Education = {
  name: string
  location: string
  dates: {
    start: string
    end: string
  }
}[]

const sortSkills = (skills: { label: string; value: number }[]) => {
  const sortedSkills = skills.slice()
  sortedSkills.sort((a, b) => b.value - a.value)
  return sortedSkills
}

export default function useData() {
  const { language } = useLocalization()
  const journeyData = React.useMemo(() => data[language].journey as Journey, [language])
  const aboutMeData = React.useMemo(() => data[language].aboutMe as AboutMe, [language])
  const educationData = React.useMemo(() => data[language].education as Education, [language])
  return React.useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      journey: journeyData.map((period: any) => ({
        ...period,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        missions: period.missions.map((mission: any) => ({
          ...mission,
          technicalSkills: sortSkills(mission.technical_skills),
          softSkills: sortSkills(mission.soft_skills),
        })),
      })) as Journey,
      aboutMe: aboutMeData as AboutMe,
      education: educationData as Education,
    }),
    [journeyData, aboutMeData, educationData]
  )
}
