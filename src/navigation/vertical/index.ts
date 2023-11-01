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

          // !! Acá se prueban las distintas rutas para poder visualizar los archivos .tsx de los errores 
          path: '/404'
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
          path: '/apps/security'
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
