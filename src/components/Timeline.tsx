import React, { useState } from 'react'

import { useLanguage } from '@/hooks/useLanguage'

import type { TimelinePeriod, TimelineProps } from '../types'
import { Icon } from './Icon'

const Timeline: React.FC<TimelineProps> = ({ periods: _periods }) => {
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)
  const periods = _periods.map(p => ({
    ...p,
    endDate: p.endDate ?? new Date(),
  }))
  const [selectedPeriod, setSelectedPeriod] = useState<string>(periods.at(-1)!.id)

  // Calculate the total time span
  const allDates = periods.flatMap(p => [p.startDate, p.endDate]).filter(Boolean) as Date[]
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  const totalTimeSpan = maxDate.getTime() - minDate.getTime()

  // Calculate timeline dimensions
  const [containerWidth, setContainerWidth] = React.useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const oneYearWidth = 250
  const timelineHeight = 80
  const arrowWidth = 0.02 * containerWidth
  const viewBoxPaddingVertical = 50
  const viewBoxPaddingHorizontal = 50
  const timelineWidth = Math.max(
    containerWidth - arrowWidth - viewBoxPaddingHorizontal * 2,
    (oneYearWidth * totalTimeSpan) / (1000 * 60 * 60 * 24 * 365)
  )
  const svgWidth = timelineWidth + arrowWidth + viewBoxPaddingHorizontal * 2
  const svgHeight = timelineHeight + viewBoxPaddingVertical * 2
  const fontSize = 1.2

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

  const handlePeriodPress = (period: TimelinePeriod) => {
    period.onPress?.()
    setSelectedPeriod(period.id)
  }

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerWidth(scrollContainerRef.current.clientWidth)
    }
  }, [scrollContainerRef])

  // Smooth scroll to focused section
  React.useEffect(() => {
    if (selectedPeriod && scrollContainerRef.current) {
      // Find the SVG element for the hovered period
      const sectionElement = scrollContainerRef.current.querySelector(
        `[data-period-id="${selectedPeriod}"]`
      ) as SVGGElement

      if (sectionElement) {
        const scrollContainer = scrollContainerRef.current

        // Calculate the position of the section relative to the scroll container
        const sectionRect = sectionElement.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()

        // Calculate how much to scroll to position the section at the start of the viewport
        const scrollLeft =
          scrollContainer.scrollLeft +
          (sectionRect.left - containerRect.left) -
          viewBoxPaddingHorizontal

        // Smooth scroll to the calculated position
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [selectedPeriod])

  const renderPeriod = (period: TimelinePeriod, key?: string) => {
    const x = getPeriodPosition(period)
    const width = getPeriodWidth(period)
    const isHovered = hoveredPeriod === period.id
    const isSelected = selectedPeriod === period.id
    const y = 0
    const height = timelineHeight

    /* Period section */
    return (
      <TimelineSection
        key={key}
        x={x}
        y={y}
        width={width}
        height={height}
        arrowWidth={arrowWidth}
        isSelected={isSelected}
        isHovered={isHovered}
        isStatic={period.id === periods[0]?.id && selectedPeriod !== periods[1]?.id}
        onPeriodPress={handlePeriodPress}
        period={period}
        setHoveredPeriod={setHoveredPeriod}
        fontSize={fontSize}
      />
    )
  }

  const currentIndex = periods.findIndex(p => p.id === selectedPeriod)
  const nextPeriod = periods[currentIndex + 1]
  const previousPeriod = periods[currentIndex - 1]
  const selectNextPeriod = nextPeriod
    ? () => {
        setSelectedPeriod(nextPeriod.id)
      }
    : undefined
  const selectPreviousPeriod = previousPeriod
    ? () => {
        setSelectedPeriod(previousPeriod.id)
      }
    : undefined

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="scrollbar-none w-full min-w-0 overflow-x-auto" ref={scrollContainerRef}>
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`-${viewBoxPaddingHorizontal + arrowWidth} -${viewBoxPaddingVertical} ${svgWidth} ${svgHeight}`}
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
              <feDropShadow
                dx="2"
                dy="2"
                stdDeviation="3"
                floodColor="#000000"
                floodOpacity="0.8"
              />
            </filter>
          </defs>

          {/* Background timeline arrow */}
          <TimelineSection
            width={timelineWidth}
            height={timelineHeight}
            x={0}
            y={0}
            arrowWidth={arrowWidth}
            isStatic={true}
          />

          {/* Period sections */}
          {selectedPeriod && renderPeriod(periods.find(p => p.id === selectedPeriod)!)}
          {[...periods]
            .filter(p => p.id !== selectedPeriod)
            .map(period => renderPeriod(period, period.id))}
        </svg>
        <Icon
          name="arrow-left"
          color={selectPreviousPeriod ? 'white' : 'gray'}
          size={40}
          shadow={!!selectPreviousPeriod}
          onPress={selectPreviousPeriod}
          style={{
            position: 'absolute',
            bottom: viewBoxPaddingVertical + timelineHeight / 2,
            left: 0,
            transform: 'translateY(50%)',
          }}
        />
        <Icon
          name="arrow-right"
          color={selectNextPeriod ? 'white' : 'gray'}
          size={40}
          shadow={!!selectNextPeriod}
          onPress={selectNextPeriod}
          style={{
            position: 'absolute',
            bottom: viewBoxPaddingVertical + timelineHeight / 2,
            right: 0,
            transform: 'translateY(50%)',
          }}
        />
      </div>
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
  fontSize = 1,
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
  fontSize?: number
}) => {
  const { language } = useLanguage()
  const opacity = isSelected || isHovered || isStatic ? 1 : 0
  const handlePress = () => period && onPeriodPress?.(period)
  const handleHover = () => period && setHoveredPeriod?.(period.id)
  const handleFocus = () => period && onPeriodPress?.(period)
  const handleBlur = () => setHoveredPeriod?.(null)
  const handleKeyDown = (e: React.KeyboardEvent<SVGPathElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePress()
      handleBlur()
    }
  }

  return (
    <g
      data-period-id={period?.id}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      onClick={handlePress}
      className="cursor-pointer"
    >
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
        className={`transition-all duration-500 ease-in-out focus:outline-none ${
          isHovered || isSelected
            ? 'drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]'
            : 'drop-shadow-[0_0_0_rgba(0,0,0,0)]'
        }`}
        style={{
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
          transform: `scale(${isHovered ? 1.02 : 1})`,
          opacity,
        }}
        tabIndex={period ? 0 : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {/* Period label */}
      {period && (
        <g>
          <text
            x={x - arrowWidth}
            y={y}
            textAnchor="start"
            opacity={isHovered || isSelected ? 1 : 0.8}
            className="fill-white text-sm font-medium"
            filter="url(#textShadow)"
            style={{
              fontSize: `${fontSize}em`,
              transform: `translateY(-${1.5 * fontSize}em)`,
            }}
          >
            {period.title}
          </text>
          <text
            x={x - arrowWidth}
            y={y}
            textAnchor="start"
            className="fill-white text-sm font-medium"
            opacity={isHovered || isSelected ? 1 : 0.8}
            filter="url(#textShadow)"
            style={{
              fontSize: `${fontSize}em`,
              transform: `translateY(-${0.5 * fontSize}em)`,
            }}
          >
            {period.startDate.toLocaleDateString(language, { year: 'numeric', month: 'long' })}
          </text>
        </g>
      )}
    </g>
  )
}
