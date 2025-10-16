import ApiIcon from './ApiIcon'
import ArrowDown from './ArrowDownIcon'
import ArrowLeft from './ArrowLeftIcon'
import ArrowRight from './ArrowRightIcon'
import ArrowUp from './ArrowUpIcon'
import BrainIcon from './BrainIcon'
import DatabaseIcon from './DatabaseIcon'
import DevOpsIcon from './DevOpsIcon'
import DoubleArrowDown from './DoubleArrowDownIcon'
import DoubleArrowUp from './DoubleArrowUpIcon'
import EmailIcon from './EmailIcon'
import GithubIcon from './GithubIcon'
import HandShakeIcon from './HandShakeIcon'
import LanguageIcon from './LanguageIcon'
import LinkIcon from './LinkIcon'
import LinkedinIcon from './LinkedinIcon'
import MobileIcon from './MobileIcon'
import StarIcon from './StarIcon'
import WebIcon from './WebIcon'

const icons = {
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'double-arrow-up': DoubleArrowUp,
  'double-arrow-down': DoubleArrowDown,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  link: LinkIcon,
  web: WebIcon,
  mobile: MobileIcon,
  api: ApiIcon,
  database: DatabaseIcon,
  devops: DevOpsIcon,
  handshake: HandShakeIcon,
  language: LanguageIcon,
  email: EmailIcon,
  brain: BrainIcon,
  star: StarIcon,
} as const

export default icons
