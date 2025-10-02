import TimelineComponent from '@/components/Timeline'
import { useData } from '@/hooks/useData'

export default function Timeline() {
  const { journey } = useData()
  return (
    <div className="w-full pl-16">
      <div className="w-[75%]">
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
      </div>
    </div>
  )
}
