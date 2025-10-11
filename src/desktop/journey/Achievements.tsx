import { Icon } from '@/components/Icon'
import MediaCarousel from '@/components/MediaCarousel'
import type { Hyperlink, MediaItem } from '@/hooks/useData'
import useDelayedValue from '@/hooks/useDelayedValue'
import useIsVisible from '@/hooks/useIsVisible'

export default function Achievements({
  title,
  media,
  hyperlinks,
}: {
  title: string
  media: MediaItem[]
  hyperlinks: Hyperlink[]
}) {
  const { ref: achievementsRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  const delayedMedia = useDelayedValue(media, 10)
  const mediaChanged = delayedMedia !== media
  return (
    <div
      ref={achievementsRef}
      className={`flex w-full flex-col items-center ${isVisible && !mediaChanged ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <h2 className="heading-h2 mb-8 w-full border-b border-gray-700 text-center">{title}</h2>
      {media.length > 0 && <MediaCarousel media={media} length={170} spacing={20} />}
      {hyperlinks.length > 0 && (
        <div className="flex w-full flex-col gap-y-4 px-8">
          {hyperlinks.map((hyperlink, index) => (
            <div key={index} className="flex items-center gap-x-3">
              <Icon name="link" size={16} color="currentColor" />
              <a
                href={hyperlink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-normal"
              >
                {hyperlink.text}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
