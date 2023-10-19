// ** Type Imports
import { Palette } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: Palette['mode'], skin: Skin): Palette => {
  // ** Vars
  const whiteColor = '#FFFFFF'
  const lightColor = '76, 78, 100'
  const darkColor = '234, 234, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#010032'
    } else if (mode === 'light') {
      return '#F7F9F9'
    } else return '#010032'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#20435e',
      lightBg: '#F7F9F9',
      bodyBg: mode === 'light' ? '#F7F9F9' : '#20435e', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F2F2F4' : '#20435e',
      avatarBg: mode === 'light' ? '#F1F1F3' : '#20435e',
      tooltipBg: mode === 'light' ? '#142B3D' : '#20435e',
      tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#20435e'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      // button colors
      light: '#00FFED',
      main: '#010032',
      dark: '#00FFED',
      contrastText: whiteColor
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: whiteColor
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: whiteColor
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: whiteColor
    },
    info: {
      light: '#59C1BD',
      main: '#59C1BD',
      dark: '#2B2C4B',
      contrastText: whiteColor
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: whiteColor,
      secondary: whiteColor,
      disabled: whiteColor,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#2B2C4B',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  } as Palette
}

export default DefaultPalette
