// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/home'
    },
    {
      title: 'Mi bitácora',
      icon: 'mdi:archive-outline',
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
    },
    {
      title: 'Configuración',
      icon: 'noto:gear',
      children: [
        {
          title: 'Cuenta',
          path: '/apps/account'
        },
        {
          title: 'Seguridad',
          path: '/apps/secutiry'
        },
        {
          title: 'Notificaciones',
          path: '/apps/notifications'
        }
      ]
    },

  ]
}

export default navigation
