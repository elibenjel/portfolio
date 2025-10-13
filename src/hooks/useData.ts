import aboutMeData from '~data/aboutme.yaml'
import journeyData from '~data/journey.yaml'

import * as React from 'react'

export type MediaItem = {
  url: string
  type: 'image' | 'video'
}

export type Hyperlink = {
  url: string
  text: string
}

export type Journey = {
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

export const useData = () => {
  return React.useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      journey: journeyData.map((period: any) => ({
        ...period,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        missions: period.missions.map((mission: any) => ({
          ...mission,
          technicalSkills: mission.technical_skills,
          softSkills: mission.soft_skills,
        })),
      })) as Journey,
      aboutMe: aboutMeData as AboutMe,
    }),
    []
  )
}
