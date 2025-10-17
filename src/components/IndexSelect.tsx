import * as React from 'react'

import { mergeClassNames, tw } from '@/utils/styling'

import { Icon } from './Icon'

export default function IndexSelect({
  maxIndex,
  index,
  onIndexSelected,
  color = 'currentColor',
}: {
  maxIndex: number
  index: number
  onIndexSelected: (index: number) => void
  color?: string
}) {
  const buttonRefs = React.useRef<HTMLButtonElement[]>([])
  const buttonClasses = {
    base: tw` h-full w-full rounded-full opacity-50 scale-50 origin-center transition-all duration-200 ease-in-out`,
    hovered: tw`group-hover:scale-100 group-hover:opacity-80`,
    selected: tw`scale-100 opacity-100`,
  }

  const handleIndexSelect = (newIndex: number) => {
    const scrollTarget =
      newIndex < index ? Math.max(newIndex - 2, 0) : Math.min(newIndex + 2, maxIndex - 1)
    buttonRefs.current[scrollTarget].scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
    onIndexSelected(newIndex)
  }
  return (
    <div className="relative max-w-full">
      <div className="absolute top-[50%] left-0 z-10 -translate-y-1/2">
        <Icon
          name="arrow-left"
          shadow
          color={color}
          size={24}
          disabled={index === 0}
          onPress={() => handleIndexSelect(index - 1)}
        />
      </div>
      <div className="fade-horizontal scrollbar-none mx-8 flex min-w-0 flex-row items-center justify-evenly overflow-x-auto">
        {Array.from({ length: maxIndex }, (_, i) => (
          <button
            ref={el => {
              buttonRefs.current[i] = el as HTMLButtonElement
            }}
            key={i}
            className="group h-8 min-h-8 w-8 min-w-8 cursor-pointer p-2"
            onClick={() => handleIndexSelect(i)}
          >
            <div
              className={mergeClassNames(
                buttonClasses.base,
                buttonClasses.hovered,
                index === i && buttonClasses.selected
              )}
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
      <div className="absolute top-[50%] right-0 z-10 -translate-y-1/2">
        <Icon
          name="arrow-right"
          shadow
          color={color}
          size={24}
          disabled={index === maxIndex - 1}
          onPress={() => handleIndexSelect(index + 1)}
        />
      </div>
    </div>
  )
}
