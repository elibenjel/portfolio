import ApiIcon from './ApiIcon'
import ArrowLeft from './ArrowLeftIcon'
import ArrowRight from './ArrowRightIcon'
import DatabaseIcon from './DatabaseIcon'
import DevOpsIcon from './DevOpsIcon'
import EmailIcon from './EmailIcon'
import GithubIcon from './GithubIcon'
import HandShakeIcon from './HandShakeIcon'
import LanguageIcon from './LanguageIcon'
import LinkIcon from './LinkIcon'
import LinkedinIcon from './LinkedinIcon'
import MobileIcon from './MobileIcon'
import WebIcon from './WebIcon'

const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
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
} as const

export default icons
