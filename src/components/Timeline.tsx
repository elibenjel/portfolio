import React, { useState } from 'react'

import { useLanguage } from '@/hooks/useLanguage'

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
  const arrowWidth = 30

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
    const endPos = getDatePosition(period.endDate!)
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
            <stop offset="0%" stopColor="#F3BBAC" />
            <stop offset="50%" stopColor="#D4A5E8" />
            <stop offset="100%" stopColor="#ACE4F3" />
          </linearGradient>

          {/* Drop shadow filters */}
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
          arrowWidth={arrowWidth}
          isStatic={true}
        />

        {/* Period sections */}
        {periods
          .sort((a, b) => (selectedPeriod === a.id ? -1 : selectedPeriod === b.id ? 1 : 0))
          .map(period => {
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
                arrowWidth={arrowWidth}
                isSelected={isSelected}
                isHovered={isHovered}
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
  arrowWidth,
  isHovered = false,
  isSelected = false,
  isStatic = false,
  period,
  onPeriodPress,
  setHoveredPeriod,
}: {
  width: number
  height: number
  x: number
  y: number
  arrowWidth: number
  isHovered?: boolean
  isSelected?: boolean
  isStatic?: boolean
  period?: TimelinePeriod
  onPeriodPress?: (period: TimelinePeriod) => void
  setHoveredPeriod?: (period: string | null) => void
}) => {
  const textShift = 15
  const { language } = useLanguage()
  const opacity = isSelected || isHovered || isStatic ? 1 : 0
  const handlePress = () => period && onPeriodPress?.(period)
  const handleFocus = () => period && setHoveredPeriod?.(period.id)
  const handleBlur = () => setHoveredPeriod?.(null)
  const handleKeyDown = (e: React.KeyboardEvent<SVGPathElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePress()
      handleBlur()
    }
  }

  return (
    <g>
      <path
        d={`M ${x - arrowWidth} ${y} 
              L ${x} ${y + height / 2} 
              L ${x - arrowWidth} ${y + height} 
              L ${x + width - arrowWidth} ${y + height} 
              L ${x + width} ${y + height / 2} 
              L ${x + width - arrowWidth} ${y} 
              Z`}
        fill="url(#timelineGradient)"
        stroke="#ffffff"
        strokeWidth={isSelected || isHovered ? 1 : 0}
        className={`cursor-pointer transition-all duration-500 ease-in-out focus:outline-none ${
          isHovered || isSelected
            ? 'drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]'
            : 'drop-shadow-[0_0_0_rgba(0,0,0,0)]'
        }`}
        style={{
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
          transform: `scale(${isHovered ? 1.05 : 1})`,
          opacity,
        }}
        tabIndex={period ? 0 : undefined}
        onClick={handlePress}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {/* Period label */}
      {period && (
        <g>
          <text
            x={x - arrowWidth}
            y={y - textShift - 15}
            textAnchor="start"
            opacity={isHovered || isSelected ? 1 : 0.8}
            className="text-sm font-medium fill-white pointer-events-none"
            filter="url(#textShadow)"
            style={{
              fontSize: '12px',
            }}
          >
            {period.title}
          </text>
          <text
            x={x - arrowWidth}
            y={y - textShift}
            textAnchor="start"
            className="text-sm font-medium fill-white pointer-events-none"
            opacity={isHovered || isSelected ? 1 : 0.8}
            filter="url(#textShadow)"
            style={{
              fontSize: '12px',
            }}
          >
            {period.startDate.toLocaleDateString(language, { year: 'numeric', month: 'long' })}
          </text>
        </g>
      )}
    </g>
  )
}
