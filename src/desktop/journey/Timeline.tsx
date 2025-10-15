import TimelineComponent from '@/components/Timeline'
import useData from '@/hooks/useData'

export default function Timeline() {
  const { journey } = useData()
  return (
    <TimelineComponent
      periods={journey.map(period => {
        return {
          id: period.period,
          title: period.period,
          startDate: new Date(period.dates.start),
          endDate: period.dates.end ? new Date(period.dates.end) : null,
        }
      })}
    />
  )
}
