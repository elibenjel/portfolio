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
  const buttonClasses = {
    base: tw` h-full w-full rounded-full opacity-50 scale-50 origin-center transition-all duration-200 ease-in-out`,
    hovered: tw`group-hover:scale-100 group-hover:opacity-80`,
    selected: tw`scale-100 opacity-100`,
  }
  return (
    <>
      <Icon
        name="arrow-left"
        shadow
        color={color}
        size={24}
        disabled={index === 0}
        onPress={() => onIndexSelected(index - 1)}
      />
      {Array.from({ length: maxIndex }, (_, i) => (
        <button
          key={i}
          className="group h-8 w-8 cursor-pointer p-2"
          onClick={() => onIndexSelected(i)}
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
      <Icon
        name="arrow-right"
        shadow
        color={color}
        size={24}
        disabled={index === maxIndex - 1}
        onPress={() => onIndexSelected(index + 1)}
      />
    </>
  )
}
