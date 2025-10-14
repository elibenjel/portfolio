import * as React from 'react'

import type { MediaItem } from '@/hooks/useData'
import useIsVisible from '@/hooks/useIsVisible'

import Image from './Image'
import IndexSelect from './IndexSelect'

export default function MediaCarousel({
  media,
  length,
  spacing,
}: {
  media: MediaItem[]
  length: number
  spacing: number
}) {
  const { ref: mediaCarouselRef, isVisible } = useIsVisible<HTMLDivElement>(0.1)
  const [focusedMediaIndex, setFocusedMediaIndex] = React.useState(0)
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([])

  // Initialize video refs array
  React.useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, media.length)
  }, [media.length])

  // Control video playback based on focusedMediaIndex and isVisible
  React.useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === focusedMediaIndex && isVisible) {
          videoRef.play()
        } else {
          videoRef.pause()
          videoRef.currentTime = 0
        }
      }
    })
  }, [focusedMediaIndex, isVisible])

  return (
    <div ref={mediaCarouselRef} className="flex w-full flex-col items-center gap-y-4">
      <div
        className="flex flex-row overflow-hidden"
        style={{
          paddingLeft: 2 * spacing,
          gap: spacing,
          width: length * 1.5 + 2 * spacing,
        }}
      >
        {media.map((m, index) => {
          let shift = focusedMediaIndex * (length + spacing)
          let opacity = 0
          let scale = 1
          switch (index) {
            case focusedMediaIndex - 1:
              shift -= length + spacing
              scale = 1.8
              break
            case focusedMediaIndex:
              opacity = 1
              if (focusedMediaIndex === media.length - 1) {
                shift -= 0.25 * length - spacing
              }
              break
            case focusedMediaIndex + 1:
              opacity = 0.5
              scale = 0.9
              break
            case focusedMediaIndex + 2:
              scale = 0
              break
          }

          return (
            <div
              key={m.url}
              className="flex flex-shrink-0 cursor-pointer flex-row items-center transition-all duration-500 ease-in-out"
              onClick={() => setFocusedMediaIndex(index)}
              style={{
                width: length,
                transform: `translateX(-${shift}px)`,
                opacity,
              }}
            >
              <div
                className="flex flex-row items-center transition-all duration-500 ease-in-out"
                style={{ scale, pointerEvents: focusedMediaIndex === index ? 'auto' : 'none' }}
              >
                {m.type === 'image' ? (
                  <Image src={m.url} alt={m.type} tabIndex={focusedMediaIndex === index ? 0 : -1} />
                ) : (
                  <video
                    ref={el => {
                      videoRefs.current[index] = el
                    }}
                    src={m.url}
                    controls={true}
                    loop
                    muted
                    tabIndex={focusedMediaIndex === index ? 0 : -1}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-row items-center justify-center gap-x-1">
        <IndexSelect
          maxIndex={media.length}
          index={focusedMediaIndex}
          onIndexSelected={setFocusedMediaIndex}
        />
      </div>
    </div>
  )
}
