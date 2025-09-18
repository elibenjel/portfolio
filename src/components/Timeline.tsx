import React, { useState } from 'react'

import type { TimelinePeriod, TimelineProps } from '../types'

const Timeline: React.FC<TimelineProps> = ({ periods: _periods }) => {
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const periods = _periods.map(p => ({
    ...p,
    endDate: p.endDate ?? new Date(),
  }))

  // Calculate timeline dimensions
  const timelineWidth = 800
  const timelineHeight = 80
  const arrowTailWidth = 30
  const arrowHeadWidth = 30

  // Calculate the total time span
  const allDates = periods.flatMap(p => [p.startDate, p.endDate]).filter(Boolean) as Date[]
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  const totalTimeSpan = maxDate.getTime() - minDate.getTime()

  // Helper function to calculate position based on date
  const getDatePosition = (date: Date) => {
    const relativeTime = date.getTime() - minDate.getTime()
    return (relativeTime / totalTimeSpan) * timelineWidth
  }

  // Helper function to calculate width based on duration
  const getPeriodWidth = (period: TimelinePeriod) => {
    const startPos = getDatePosition(period.startDate)
    const endPos = period.endDate ? getDatePosition(period.endDate) : timelineWidth - arrowHeadWidth
    return Math.max(endPos - startPos, 20) // Minimum width of 20px
  }

  // Helper function to calculate position for period
  const getPeriodPosition = (period: TimelinePeriod) => {
    return getDatePosition(period.startDate)
  }

  return (
    <div className="w-full flex justify-center p-8">
      <svg
        width={timelineWidth}
        height={timelineHeight}
        viewBox={`0 0 ${timelineWidth} ${timelineHeight}`}
        className="overflow-visible"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="timelineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#00c7b4" />
            <stop offset="50%" stopColor="#a700ff" />
            <stop offset="100%" stopColor="#ff00a0" />
          </linearGradient>
          <linearGradient id="periodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c7b4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff00a0" stopOpacity="0.9" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Background timeline arrow */}
        <TimelineSection
          width={timelineWidth}
          height={timelineHeight}
          x={0}
          y={timelineHeight * 0.15}
          arrowTailWidth={arrowTailWidth}
          arrowHeadWidth={arrowHeadWidth}
        />

        {/* Period sections */}
        {periods.map(period => {
          const x = getPeriodPosition(period)
          const width = getPeriodWidth(period)
          const isHovered = hoveredPeriod === period.id
          const isSelected = selectedPeriod === period.id
          const y = 0.15 * timelineHeight
          const height = timelineHeight

          /* Period section */
          return (
            <TimelineSection
              key={period.id}
              x={x}
              y={y}
              width={width}
              height={height}
              arrowTailWidth={arrowTailWidth}
              arrowHeadWidth={arrowHeadWidth}
              isHovered={isHovered}
              isSelected={isSelected}
              onPeriodPress={() => {
                period.onPress?.()
                setSelectedPeriod(period.id)
              }}
              period={period}
              setHoveredPeriod={setHoveredPeriod}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Timeline

const TimelineSection = ({
  width,
  height,
  x,
  y,
  arrowTailWidth,
  arrowHeadWidth,
  isHovered = false,
  isSelected = false,
  period,
  onPeriodPress,
  setHoveredPeriod,
}: {
  width: number
  height: number
  x: number
  y: number
  arrowTailWidth: number
  arrowHeadWidth: number
  isHovered?: boolean
  isSelected?: boolean
  period?: TimelinePeriod
  onPeriodPress?: (period: TimelinePeriod) => void
  setHoveredPeriod?: (period: string | null) => void
}) => {
  return (
    <g>
      <path
        d={`M ${x} ${y} 
              L ${x + arrowTailWidth} ${y + height / 2} 
              L ${x} ${y + height} 
              L ${x + width - arrowHeadWidth} ${y + height} 
              L ${x + width} ${y + height / 2} 
              L ${x + width - arrowHeadWidth} ${y} 
              Z`}
        fill="url(#timelineGradient)"
        stroke="#ffffff"
        strokeWidth={isSelected ? 2 : isHovered ? 1 : 0}
        className="cursor-pointer transition-all duration-200 ease-in-out"
        style={{
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
          transform: `scale(${isHovered ? 1.05 : 1})`,
        }}
        onClick={() => period && onPeriodPress?.(period)}
        onMouseEnter={() => period && setHoveredPeriod?.(period.id)}
        onMouseLeave={() => setHoveredPeriod?.(null)}
      />

      {/* Period label */}
      {period && (
        <text
          x={x + width / 2}
          y={height / 2 + 3}
          textAnchor="middle"
          className="text-sm font-medium fill-white pointer-events-none"
          filter="url(#textShadow)"
          style={{
            fontSize: isHovered ? '13px' : '12px',
            transition: 'font-size 0.2s ease-in-out',
          }}
        >
          {period.title}
        </text>
      )}
    </g>
  )
}
