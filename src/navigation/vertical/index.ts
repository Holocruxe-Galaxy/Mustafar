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
      icon: 'mdi:settings-outline',
      children: [
        {
          title: 'Cuenta',
          path: '/pages/account-settings/account'
        },
        {
          title: 'Seguridad',
          path: '/pages/account-settings/security'
        },
        {
          title: 'Notificaciones',
          path: '/pages/account-settings/notifications'
        }
      ]
    },

  ]
}

export default navigation
