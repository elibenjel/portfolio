export type Section = 'about' | 'journey' | 'contact' | 'cover' | 'education'

export interface TimelinePeriod {
  id: string
  title: string
  startDate: Date
  endDate: Date | null // null for ongoing periods
  onPress?: () => void
}

export interface TimelineProps {
  periods: TimelinePeriod[]
}
