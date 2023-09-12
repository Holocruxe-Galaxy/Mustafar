// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'fluent-emoji-flat:rocket',
      path: '/home'
    },
    {
      title: 'Mi bitácora',
      icon: 'fluent-emoji-flat:notebook',
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
