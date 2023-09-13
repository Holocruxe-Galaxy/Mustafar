// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'noto:rocket',
      path: '/home'
    },
    {
      title: 'Mi bitácora',
      icon: 'emojione:blue-book',
      children: [
        {
          title: 'Diario',
          path: '/apps/diary'
        },
        {
          title: 'Organizador',
          path: ''
        },
        {
          title: 'Recuerdos',
          path: ''
        }
      ]
    }
  ]
}

export default navigation
