import React from 'react'

import type { TimelinePeriod } from '../types'
import Timeline from './Timeline'

const TimelineExample: React.FC = () => {
  // Example periods data
  const periods: TimelinePeriod[] = [
    {
      id: '1',
      title: 'Doctorat',
      startDate: new Date('2017-01-01'),
      endDate: new Date('2021-12-31'),
      onPress: () => {
        console.log('Doctorat')
      },
    },
    {
      id: '2',
      title: 'Auto-Formation',
      startDate: new Date('2021-11-01'),
      endDate: new Date('2022-08-31'),
      onPress: () => {
        console.log('Auto-Formation')
      },
    },
    {
      id: '3',
      title: 'Alerion',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
      onPress: () => {
        console.log('Alerion')
      },
    },
    {
      id: '4',
      title: 'Surpreat',
      startDate: new Date('2025-01-01'),
      endDate: null, // Ongoing
      onPress: () => {
        console.log('Surpreat')
      },
    },
  ]

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-50">
        Professional Journey Timeline
      </h2>
      <Timeline periods={periods} />
    </div>
  )
}

export default TimelineExample
