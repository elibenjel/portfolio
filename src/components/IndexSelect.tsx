import { mergeClassNames, tw } from '@/utils/styling'

export default function IndexSelect({
  maxIndex,
  index,
  onIndexSelected,
  color = 'white',
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
  return Array.from({ length: maxIndex }, (_, i) => (
    <button key={i} className="group h-8 w-8 cursor-pointer p-2" onClick={() => onIndexSelected(i)}>
      <div
        className={mergeClassNames(
          buttonClasses.base,
          buttonClasses.hovered,
          index === i && buttonClasses.selected
        )}
        style={{ backgroundColor: color }}
      />
    </button>
  ))
}
