// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersData = {
  data: UsersType[]
}

export type UsersType = {
  id: number
  fullName: string
  email: string
  status: string
  role?: string
  plan?: string
/*   avatar: string
  company: string
  country: string
  contact: string
  username: string
  avatarColor?: ThemeColor */
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
