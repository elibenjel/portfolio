import * as React from 'react'

import useLanguage from '@/hooks/useLanguage'
import useScrollState from '@/hooks/useScrollState'

import type { TimelinePeriod, TimelineProps } from '../types'
import { Icon } from './Icon'

const Timeline: React.FC<TimelineProps> = ({ periods: _periods, onPeriodSelect }) => {
  const periods = React.useMemo(
    () =>
      _periods
        .slice()
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .map(p => ({
          ...p,
          endDate: p.endDate ?? new Date(),
        })),
    [_periods]
  )
  const [drawingControls, setDrawingControls] = React.useState<{
    selected: string
    hovered: string | null
    unhovered: Set<string>
  }>({
    selected: periods.at(-1)!.id,
    hovered: null,
    unhovered: new Set(),
  })

  const handleHover = (periodId: string | null) => {
    setDrawingControls(prev => ({
      ...prev,
      hovered: periodId,
      unhovered: new Set([...prev.unhovered].filter(id => id !== periodId)),
    }))
  }

  const handleUnhover = (periodId: string) => {
    setDrawingControls(prev => ({
      ...prev,
      hovered: null,
      unhovered: new Set([...prev.unhovered, periodId]),
    }))
    setTimeout(() => {
      setDrawingControls(prev => ({
        ...prev,
        unhovered: new Set([...prev.unhovered].filter(id => id !== periodId)),
      }))
    }, 500)
  }

  const handleSelect = (periodId: string) => {
    setDrawingControls(prev => ({
      ...prev,
      selected: periodId,
      hovered: null,
      unhovered: new Set([]),
    }))
  }

  React.useEffect(() => {
    onPeriodSelect?.(periods.find(p => p.id === drawingControls.selected)!)
  }, [drawingControls.selected, onPeriodSelect, periods])

  // Calculate the total time span
  const allDates = periods.flatMap(p => [p.startDate, p.endDate]).filter(Boolean) as Date[]
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  const totalTimeSpan = maxDate.getTime() - minDate.getTime()

  // Calculate timeline dimensions
  const [containerWidth, setContainerWidth] = React.useState(0)
  const backgroundDivRef = React.useRef<HTMLDivElement>(null)
  const foregroundDivRef = React.useRef<HTMLDivElement>(null)
  const { canScrollLeft, canScrollRight } = useScrollState(foregroundDivRef)
  const oneYearWidth = 250
  const timelineHeight = 70
  const arrowWidth = timelineHeight / 5
  const viewBoxPaddingVertical = 50
  const viewBoxPaddingHorizontal = 200
  const timelineWidth = Math.max(
    containerWidth - arrowWidth - viewBoxPaddingHorizontal * 2,
    (oneYearWidth * totalTimeSpan) / (1000 * 60 * 60 * 24 * 365)
  )
  const svgWidth = timelineWidth + arrowWidth + viewBoxPaddingHorizontal * 2
  const svgHeight = timelineHeight + viewBoxPaddingVertical * 2
  const viewBox = [
    -viewBoxPaddingHorizontal - arrowWidth,
    -viewBoxPaddingVertical,
    svgWidth,
    svgHeight,
  ]
  const fontSize = 1.1

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
    handleSelect(period.id)
  }

  React.useEffect(() => {
    if (backgroundDivRef.current) {
      setContainerWidth(backgroundDivRef.current.clientWidth)
    }
  }, [backgroundDivRef])

  React.useEffect(() => {
    foregroundDivRef.current?.scrollTo({
      left: foregroundDivRef.current.scrollWidth,
      behavior: 'instant',
    })
    backgroundDivRef.current?.scrollTo({
      left: backgroundDivRef.current.scrollWidth,
      behavior: 'instant',
    })
  }, [])

  // Smooth scroll to focused section
  React.useEffect(() => {
    if (drawingControls.selected && foregroundDivRef.current) {
      // Find the SVG element for the hovered period
      const sectionElement = foregroundDivRef.current.querySelector(
        `[data-period-id="${drawingControls.selected}"]`
      ) as SVGGElement

      if (sectionElement) {
        const scrollContainer = foregroundDivRef.current

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
        backgroundDivRef.current?.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [drawingControls.selected])

  const renderPeriod = (period: TimelinePeriod) => {
    const x = getPeriodPosition(period)
    const width = getPeriodWidth(period)
    const isHovered = drawingControls.hovered === period.id
    const isSelected = drawingControls.selected === period.id
    const y = 0
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
        onPeriodPress={handlePeriodPress}
        period={period}
        onHover={handleHover}
        onUnhover={handleUnhover}
      />
    )
  }

  const renderPeriodLabels = (period: TimelinePeriod) => {
    const x = getPeriodPosition(period)
    const isHovered = drawingControls.hovered === period.id
    const isSelected = drawingControls.selected === period.id
    const y = 0
    return (
      <TimelineLabels
        key={period.id}
        x={x}
        y={y}
        arrowWidth={arrowWidth}
        isHovered={isHovered}
        isSelected={isSelected}
        period={period}
        fontSize={fontSize}
      />
    )
  }

  const selectedPeriod = periods.find(p => p.id === drawingControls.selected)!
  const hoveredPeriod = periods.find(p => p.id === drawingControls.hovered)
  const unhoveredPeriods = periods.filter(p => drawingControls.unhovered.has(p.id))
  const currentIndex = periods.indexOf(selectedPeriod)
  const nextPeriod = periods[currentIndex + 1]
  const previousPeriod = periods[currentIndex - 1]
  const selectNextPeriod = nextPeriod
    ? () => {
        handlePeriodPress(nextPeriod)
        handleSelect(nextPeriod.id)
      }
    : undefined
  const selectPreviousPeriod = previousPeriod
    ? () => {
        handlePeriodPress(previousPeriod)
        handleSelect(previousPeriod.id)
      }
    : undefined

  const orderedPeriods = [
    ...periods.filter(
      p =>
        p.id !== drawingControls.selected &&
        p.id !== drawingControls.hovered &&
        !drawingControls.unhovered.has(p.id)
    ),
    ...unhoveredPeriods,
    drawingControls.selected !== drawingControls.hovered &&
      !drawingControls.unhovered.has(drawingControls.selected) &&
      selectedPeriod,
    drawingControls.hovered && hoveredPeriod,
  ].filter(Boolean) as TimelinePeriod[]

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="pointer-events-none w-full min-w-0 overflow-hidden" ref={backgroundDivRef}>
        <svg width={svgWidth} height={svgHeight} viewBox={viewBox.join(' ')}>
          {/* Period labels */}
          {orderedPeriods.map(period => period && renderPeriodLabels(period))}
        </svg>
      </div>
      <div
        className={`absolute inset-0 min-w-0 overflow-hidden ${canScrollLeft && canScrollRight ? 'fade-horizontal' : canScrollLeft ? 'fade-left' : canScrollRight ? 'fade-right' : ''}`}
        ref={foregroundDivRef}
      >
        <svg width={svgWidth} height={svgHeight} viewBox={viewBox.join(' ')}>
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
              <stop offset="0%" stopColor="#BEBFC5" />
              <stop offset="100%" stopColor="#F5F5F5" />
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
          />

          {/* Period sections */}
          {orderedPeriods.map(period => period && renderPeriod(period))}
        </svg>
      </div>
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
  period,
  onPeriodPress,
  onHover,
  onUnhover,
}: {
  width: number
  height: number
  x: number
  y: number
  arrowWidth: number
  isHovered?: boolean
  isSelected?: boolean
  period?: TimelinePeriod
  onPeriodPress?: (period: TimelinePeriod) => void
  onHover?: (period: string | null) => void
  onUnhover?: (period: string) => void
  fontSize?: number
}) => {
  const [scale, setScale] = React.useState(1)
  const handlePress = () => period && onPeriodPress?.(period)
  const handleHover = () => period && onHover?.(period.id)
  const handleFocus = () => period && onPeriodPress?.(period)
  const handleBlur = () => period && onUnhover?.(period.id)

  React.useEffect(() => {
    setScale(isHovered ? 1.02 : 1)
  }, [isHovered, isSelected])

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
        stroke="white"
        className={`transition-all duration-500 ease-in-out focus:outline-none ${isHovered || isSelected ? 'drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]' : 'drop-shadow-[0_0_0_rgba(0,0,0,0)]'}`}
        style={{
          transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
          transform: `scale(${scale})`,
          strokeOpacity: isHovered || isSelected ? 1 : 0,
        }}
        tabIndex={period ? 0 : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </g>
  )
}

const TimelineLabels = ({
  x,
  y,
  arrowWidth,
  isHovered = false,
  isSelected = false,
  period,
  fontSize = 1,
}: {
  x: number
  y: number
  arrowWidth: number
  isHovered?: boolean
  isSelected?: boolean
  period?: TimelinePeriod
  fontSize?: number
}) => {
  const { language } = useLanguage()
  return (
    period && (
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
            transform: `translateY(-${1.8 * fontSize}em)`,
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
            transform: `translateY(-${0.6 * fontSize}em)`,
          }}
        >
          {period.startDate.toLocaleDateString(language, { year: 'numeric', month: 'long' })}
        </text>
      </g>
    )
  )
}
