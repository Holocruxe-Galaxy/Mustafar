import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// ** Material UI
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Switch,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { makeStyles } from '@mui/styles'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'

// ** Redux Toolkit
import { deleteDiary, editEntrie } from 'src/store/apps/diary'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Utils
import emotions from 'src/@core/utils/emotions'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

// TODO: Poner SVG correspondientes para el switch
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2
  }
}))

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 60,
    zIndex: 9999
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent' // Set the background color to transparent on hover
    },
    '&:active': {
      backgroundColor: 'transparent' // Set the background color to transparent when active (clicked)
    },
    '& .MuiIconButton-label': {
      transition: 'none' // Remove any transitions on the label (icon) to prevent animations
    }
  }
}))

const Entries = ({ id, props }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const contentRef = useRef<HTMLInputElement>(props.content)
  const favoriteRef = useRef<HTMLElement>(props.favorite)
  const emojiRef = useRef<HTMLSelectElement>(props.emoji)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const { control, handleSubmit } = useForm({
    defaultValues: { content: props.content, emoji: props.emoji, photos: props.photos, favorite: props.favorite }
  })

  const { fields, remove } = useFieldArray({
    control,
    name: 'photos'
  })

  const onSubmit = (data: any) => {
    if (data.emoji === undefined) delete data.emoji

    if (!data.photos.length && !props.photos.length) delete data.photos

    dispatch(editEntrie({ ...data, _id: id }))
    handleCloseEdit()
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDelete = () => {
    dispatch(deleteDiary(id))
  }

  const handleEmojiSelect = (emoji: any) => {
    console.log(inputRef.current)
    if (inputRef.current && isPickerVisible) {
      const cursorPosition = inputRef.current.selectionStart || 0
      const inputValue = inputRef.current.value
      const beforeCursor = inputValue.substring(0, cursorPosition)
      const afterCursor = inputValue.substring(cursorPosition)

      const newValue = beforeCursor + emoji.native + afterCursor
      inputRef.current.value = newValue
    }

    // TODO: ocultar picker cuando se clickea en otra parte de la pagina.

    setPickerVisible(!isPickerVisible)
  }

  const style = {
    position: 'absolute' as const,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4
  }

  const styleModal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const styleEdit = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  }

  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#59c1bd' }}>R</Avatar>}
        action={
          <>
            {props.emoji && <IconButton>{props.emoji}</IconButton>}
            {props.favorite && (
              <Tooltip title='Tu publicación se encuentra dentro de tus favoritos' placement='top'>
                <IconButton className={classes.iconButton}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='60' height='101' viewBox='0 0 105 105' fill='none'>
                    <g filter='url(#filter0_d_849_49601)'>
                      <path
                        d='M30.2666 52.7425L35.7558 47.3339L45.1016 45.6777L44.1778 50.569L31.5432 54.4524L30.7268 54.0997L30.2666 52.7425Z'
                        fill='#2B2C4B'
                      />
                      <path
                        d='M36.7066 48.7208L30.7471 54.1361L35.1311 56.2727L41.786 52.8763V51.2739L43.1465 47.6055L36.7066 48.7208ZM50.8093 58.258L47.9303 59.5077L45.2125 65.2691C45.2125 65.2691 47.6044 70.5668 47.7119 70.5668C47.8194 70.5668 49.18 70.6743 49.18 70.6743L54.0175 65.2657L55.2403 56.0274L50.8093 58.258Z'
                        fill='#46476B'
                      />
                      <path
                        d='M47.9804 62.5212C47.9804 62.5212 49.5829 62.1954 50.725 61.6511C51.8672 61.1069 53.2782 60.2939 53.2782 60.2939L52.7608 64.8056L47.705 70.5602C47.705 70.5602 47.5068 70.315 46.6669 68.4875C45.9984 67.0295 45.7666 66.5088 45.7666 66.5088L47.9804 62.5212Z'
                        fill='#46476B'
                      />
                      <path
                        d='M39.6085 55.7421C39.6085 55.7421 37.6802 55.5809 35.5671 58.2516C33.6389 60.6905 32.7352 64.6612 32.3858 65.6825C32.0364 66.7037 31.2 66.912 31.4788 67.379C31.7576 67.8459 32.9636 67.8191 34.4518 67.6343C35.94 67.4495 37.2166 66.9826 37.2166 66.9826C37.2166 66.9826 37.1528 67.1438 36.9378 67.4932C36.8605 67.6175 36.5917 67.7955 36.6119 67.9803C36.6589 68.4204 40.4282 68.4305 43.4382 65.3331C46.69 61.9905 45.1111 59.2493 45.1111 59.2493L39.6085 55.7421Z'
                        fill='#F836F4'
                      />
                      <path
                        d='M40.1901 57.2979C40.1901 57.2979 38.1107 57.4087 36.3907 60.0794C34.6707 62.7501 33.8711 65.8441 34.0358 66.0524C34.197 66.2607 37.4018 65.1017 38.1711 65.3335C38.6986 65.4947 38.4265 66.0289 38.5676 66.17C38.6851 66.2875 40.0759 66.4857 42.3267 64.0468C44.5808 61.6079 44.0467 58.1814 44.0467 58.1814L40.1901 57.2979Z'
                        fill='#FBF0B4'
                      />
                      <path
                        d='M41.2111 53.6523C41.2111 53.6523 40.1663 54.5829 39.7934 55.117C39.4205 55.6512 39.4205 55.6982 39.444 55.8595C39.4676 56.0207 39.8539 57.7911 41.463 59.3431C43.4383 61.2479 45.202 61.5032 45.4573 61.5032C45.7126 61.5032 47.4091 59.5984 47.4091 59.5984L41.2111 53.6523Z'
                        fill='#858585'
                      />
                      <path
                        d='M45.8301 59.2962C45.8301 59.2962 47.5232 60.4082 50.3619 59.4541C54.242 58.1507 57.0873 55.2348 60.6113 51.5529C64.011 47.9987 66.8631 43.5878 66.8631 43.5878L64.8643 36.8926L45.8301 59.2962Z'
                        fill='#437687'
                      />
                      <path
                        d='M51.8408 55.6309L52.3078 54.1797L53.4768 54.3443C53.4768 54.3443 54.3671 54.7642 55.0221 55.0699C55.6772 55.3756 56.5204 55.6074 56.5204 55.6074L54.8575 57.0116C54.8575 57.0116 53.9505 56.669 53.2887 56.3801C52.5429 56.0542 51.8408 55.6309 51.8408 55.6309Z'
                        fill='#2B2C4B'
                      />
                      <path
                        d='M57.3262 34.0674C57.3262 34.0674 54.0944 35.9419 49.4619 40.3259C45.2862 44.2765 42.1922 47.8509 41.443 50.8911C40.8182 53.4375 41.1508 54.9829 42.5718 56.6525C44.0734 58.4195 45.8337 59.2963 45.8337 59.2963C45.8337 59.2963 47.1573 59.3164 52.6801 55.0668C59.5702 49.7624 65.0897 40.8802 65.0897 40.8802L57.3262 34.0674Z'
                        fill='#8DAFBF'
                      />
                      <path
                        d='M63.9983 42.7008C63.9983 42.7008 61.1865 41.5015 59.1809 38.7032C57.1888 35.925 57.3467 34.0471 57.3467 34.0471C57.3467 34.0471 59.013 32.7403 62.7587 31.2454C65.2782 30.2409 68.7081 29.7269 69.8369 30.5634C70.9656 31.3999 69.0642 35.5958 69.0642 35.5958L65.6007 42.3011L63.9983 42.7008Z'
                        fill='#46476B'
                      />
                      <path
                        d='M51.9009 55.6551C51.9009 55.6551 49.4721 54.4155 47.9268 52.6518C45.0041 49.3227 44.3994 45.6677 44.3994 45.6677L45.8675 43.9443C45.8675 43.9443 46.2336 47.8278 49.3679 51.1838C51.4104 53.3707 53.5436 54.3718 53.5436 54.3718C53.5436 54.3718 53.117 54.7313 52.6601 55.0807C52.3679 55.3057 51.9009 55.6551 51.9009 55.6551Z'
                        fill='#00FFED'
                      />
                      <path
                        d='M66.8636 43.5882C66.8636 43.5882 68.3216 41.8313 69.7023 37.8706C71.6305 32.3478 69.9509 30.6748 69.9509 30.6748C69.9509 30.6748 69.3831 33.3018 67.4112 36.9535C65.8289 39.8795 63.9141 42.6644 63.9141 42.6644C63.9141 42.6644 64.9689 43.1381 65.54 43.3027C66.2589 43.511 66.8636 43.5882 66.8636 43.5882Z'
                        fill='#282831'
                      />
                      <path
                        d='M42.3738 52.0472C42.8105 52.4638 43.4723 52.027 43.9056 51.0058C44.3423 49.9845 44.3356 49.4134 43.9997 49.1716C43.5831 48.8692 42.8844 49.531 42.5787 50.1189C42.2427 50.7706 42.0445 51.7314 42.3738 52.0472ZM57.538 35.4082C57.538 35.4082 54.9815 37.2458 52.2537 39.7452C49.7509 42.0396 48.0914 43.8335 47.863 44.2501C47.6211 44.6969 47.6177 45.3284 47.8059 45.6509C47.994 45.9734 48.4106 46.1414 48.7902 45.8592C49.1698 45.5737 51.8741 42.5838 54.3163 40.4473C56.5503 38.4921 58.2737 37.2525 58.2737 37.2525C58.2737 37.2525 58.9724 36.0163 58.8582 35.7341C58.744 35.4485 57.538 35.4082 57.538 35.4082Z'
                        fill='#B3E1EE'
                      />
                      <path
                        d='M57.5381 35.4077C57.5381 35.4077 59.4261 33.9599 61.482 32.942C63.3935 31.9946 65.2949 31.2052 65.6375 31.8905C65.9634 32.5422 63.8336 33.4291 61.959 34.625C60.0845 35.8209 58.2805 37.2487 58.2805 37.2487C58.2805 37.2487 58.005 36.7448 57.827 36.2778C57.7141 35.9936 57.6176 35.7031 57.5381 35.4077Z'
                        fill='#00FFED'
                      />
                      <path
                        d='M59.0971 41.8315C57.2259 40.1081 54.6224 40.5717 53.3391 42.1036C52.0222 43.6825 52.1196 46.0945 53.675 47.5458C55.0893 48.8627 57.7197 49.1617 59.3053 47.314C60.7163 45.6746 60.6289 43.2391 59.0971 41.8315Z'
                        fill='#E1E1E1'
                      />
                      <path
                        d='M54.306 42.7109C53.194 43.8027 53.2545 45.9661 54.5781 46.9538C55.7337 47.8171 57.3731 47.7735 58.401 46.722C59.429 45.6705 59.429 43.759 58.4649 42.7713C57.3563 41.6392 55.5792 41.4612 54.306 42.7109Z'
                        fill='#2B2C4B'
                      />
                      <path
                        d='M45.797 54.4757C45.797 54.4757 47.8764 52.366 48.1049 52.5944C48.3333 52.8229 48.3031 54.1028 47.3087 55.5272C46.311 56.9516 44.1173 59.4879 42.3805 61.1978C40.6672 62.8809 38.2518 64.8058 38.0234 64.7722C37.8453 64.7453 37.1231 64.3859 36.8342 64.0365C36.552 63.6905 37.3952 62.0544 37.7345 61.5136C38.0771 60.9727 45.797 54.4757 45.797 54.4757Z'
                        fill='#2B2C4B'
                      />
                      <path
                        d='M36.1316 62.8603C36.1047 63.344 36.8438 64.0495 36.8438 64.0495L48.1044 52.5974C48.1044 52.5974 47.577 52.0028 46.0249 52.9669C44.4595 53.9411 43.0888 55.1102 41.0665 57.0687C38.248 59.8032 36.1584 62.3765 36.1316 62.8603Z'
                        fill='#2B2C4B'
                      />
                      <path
                        d='M35.4027 41.0585C35.0298 41.4314 35.013 42.0294 35.4296 42.372C35.7991 42.6777 36.4005 42.4795 36.6255 42.2041C36.8506 41.9286 36.8238 41.3306 36.5248 41.035C36.2258 40.736 35.6312 40.8334 35.4027 41.0585Z'
                        fill='white'
                      />
                      <path
                        opacity='0.5'
                        d='M42.7806 40.622C42.4984 40.9344 42.5891 41.398 42.8512 41.5693C43.1132 41.7406 43.5063 41.7238 43.6977 41.4887C43.8691 41.277 43.8892 40.8538 43.6272 40.5917C43.3988 40.3666 42.962 40.4204 42.7806 40.622Z'
                        fill='white'
                      />
                      <path
                        d='M47.6612 32.6396C47.6612 32.6396 48.071 31.4706 48.3129 31.4571C48.5581 31.4437 48.9109 32.6262 48.9109 32.6262C48.9109 32.6262 50.1236 32.6396 50.2042 32.8177C50.3084 33.0461 49.4282 33.8121 49.4282 33.8121C49.4282 33.8121 49.7138 34.9543 49.5794 35.092C49.4282 35.2432 48.3834 34.6418 48.3834 34.6418C48.3834 34.6418 47.3084 35.391 47.0766 35.1861C46.8751 35.008 47.295 33.7986 47.295 33.7986C47.295 33.7986 46.2872 33.0629 46.3409 32.858C46.4182 32.5691 47.6612 32.6396 47.6612 32.6396ZM61.5891 60.6703C61.9956 60.8953 62.5063 60.7677 62.6944 60.3343C62.8657 59.948 62.5499 59.4878 62.2644 59.3635C61.9788 59.2392 61.4783 59.4038 61.2969 59.7296C61.1188 60.0521 61.3439 60.5359 61.5891 60.6703ZM67.3606 50.7635C67.1288 50.404 66.6282 50.2864 66.3024 50.5753C65.9866 50.8575 66.0638 51.301 66.2419 51.5261C66.4199 51.7511 66.897 51.8351 67.1859 51.6503C67.4748 51.4656 67.5016 50.9785 67.3606 50.7635Z'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <filter
                        id='filter0_d_849_49601'
                        x='-1'
                        y='-1.35449'
                        width='103'
                        height='103'
                        filterUnits='userSpaceOnUse'
                        color-interpolation-filters='sRGB'
                      >
                        <feFlood flood-opacity='0' result='BackgroundImageFix' />
                        <feColorMatrix
                          in='SourceAlpha'
                          type='matrix'
                          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                          result='hardAlpha'
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation='15' />
                        <feComposite in2='hardAlpha' operator='out' />
                        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.929412 0 0 0 0.5 0' />
                        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49601' />
                        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_849_49601' result='shape' />
                      </filter>
                    </defs>
                  </svg>
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title='Editar publicación' placement='top'>
              <IconButton className={classes.iconButton} onClick={handleOpenEdit} sx={{ marginLeft: 2, marginTop: 1 }}>
                <svg xmlns='http://www.w3.org/2000/svg' width='25' height='48' viewBox='0 0 48 48' fill='none'>
                  <g filter='url(#filter0_di_849_49845)'>
                    <path
                      d='M7.80953 36.7567H29.7143L42.0953 22.7027V4.32432C42.0953 1.94594 40.381 0 38.2858 0H7.80953C5.71429 0 4 1.94594 4 4.32432V32.4324C4 34.8107 5.71429 36.7567 7.80953 36.7567Z'
                      fill='#A5FCF6'
                      fill-opacity='0.81'
                    />
                    <path
                      d='M43.7147 19.5681L41.048 16.5411C40.6671 16.1087 40.0004 16.1087 39.5242 16.5411L38.2861 17.9465L42.4766 22.7033L43.7147 21.2979C44.0957 20.8654 44.0957 20.1087 43.7147 19.5681Z'
                      fill='#E57373'
                    />
                    <path
                      d='M24.4443 33.694L36.1615 20.3945L40.3367 25.134L28.6186 38.4323L24.4443 33.694Z'
                      fill='#FF9800'
                    />
                    <path
                      d='M42.4777 22.7442L40.3901 25.114L36.2158 20.3745L38.3034 18.0059L42.4777 22.7442Z'
                      fill='#B0BEC5'
                    />
                    <path d='M24.4754 33.7295L23.0469 39.9997L28.5707 38.3781L24.4754 33.7295Z' fill='#FFC107' />
                    <path d='M23.7135 36.7568L23.0469 40.0001L25.904 39.2433L23.7135 36.7568Z' fill='#37474F' />
                    <path
                      d='M11.0532 8.64844C10.698 8.64844 10.3573 8.81115 10.1061 9.10078C9.85497 9.39041 9.71387 9.78324 9.71387 10.1928C9.71387 10.6024 9.85497 10.9953 10.1061 11.2849C10.3573 11.5745 10.698 11.7372 11.0532 11.7372H19.9817C20.3369 11.7372 20.6776 11.5745 20.9288 11.2849C21.1799 10.9953 21.321 10.6024 21.321 10.1928C21.321 9.78324 21.1799 9.39041 20.9288 9.10078C20.6776 8.81115 20.3369 8.64844 19.9817 8.64844H11.0532ZM16.4103 14.826C16.0551 14.826 15.7144 14.9887 15.4633 15.2784C15.2121 15.568 15.071 15.9608 15.071 16.3704C15.071 16.78 15.2121 17.1729 15.4633 17.4625C15.7144 17.7521 16.0551 17.9148 16.4103 17.9148H24.446C24.8012 17.9148 25.1419 17.7521 25.393 17.4625C25.6442 17.1729 25.7853 16.78 25.7853 16.3704C25.7853 15.9608 25.6442 15.568 25.393 15.2784C25.1419 14.9887 24.8012 14.826 24.446 14.826H16.4103ZM13.2853 22.548C13.2853 22.1384 13.4264 21.7456 13.6776 21.456C13.9287 21.1663 14.2694 21.0036 14.6246 21.0036H31.5889C31.696 21.0036 31.7996 21.018 31.8996 21.0448L29.2567 24.0924H14.6246C14.2694 24.0924 13.9287 23.9297 13.6776 23.6401C13.4264 23.3504 13.2853 22.9576 13.2853 22.548ZM24.4889 29.5905L26.2335 27.5766C25.9881 27.3216 25.6693 27.1807 25.3389 27.1812H11.0532C10.698 27.1812 10.3573 27.3439 10.1061 27.6336C9.85497 27.9232 9.71387 28.316 9.71387 28.7256C9.71387 29.1352 9.85497 29.528 10.1061 29.8177C10.3573 30.1073 10.698 30.27 11.0532 30.27H23.9746C24.1324 30.0303 24.3042 29.8032 24.4889 29.5905ZM28.4639 16.3704C28.4639 15.9608 28.605 15.568 28.8562 15.2784C29.1073 14.9887 29.448 14.826 29.8032 14.826H35.1603C35.5155 14.826 35.8562 14.9887 36.1073 15.2784C36.3585 15.568 36.4996 15.9608 36.4996 16.3704C36.4996 16.78 36.3585 17.1729 36.1073 17.4625C35.8562 17.7521 35.5155 17.9148 35.1603 17.9148H29.8032C29.448 17.9148 29.1073 17.7521 28.8562 17.4625C28.605 17.1729 28.4639 16.78 28.4639 16.3704ZM25.3389 8.64844C24.9837 8.64844 24.643 8.81115 24.3919 9.10078C24.1407 9.39041 23.9996 9.78324 23.9996 10.1928C23.9996 10.6024 24.1407 10.9953 24.3919 11.2849C24.643 11.5745 24.9837 11.7372 25.3389 11.7372H36.946C37.3012 11.7372 37.6419 11.5745 37.8931 11.2849C38.1442 10.9953 38.2853 10.6024 38.2853 10.1928C38.2853 9.78324 38.1442 9.39041 37.8931 9.10078C37.6419 8.81115 37.3012 8.64844 36.946 8.64844H25.3389Z'
                      fill='#010032'
                    />
                  </g>
                  <defs>
                    <filter
                      id='filter0_di_849_49845'
                      x='0'
                      y='0'
                      width='48'
                      height='48'
                      filterUnits='userSpaceOnUse'
                      color-interpolation-filters='sRGB'
                    >
                      <feFlood flood-opacity='0' result='BackgroundImageFix' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dy='4' />
                      <feGaussianBlur stdDeviation='2' />
                      <feComposite in2='hardAlpha' operator='out' />
                      <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
                      <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49845' />
                      <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_849_49845' result='shape' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dy='4' />
                      <feGaussianBlur stdDeviation='2' />
                      <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
                      <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
                      <feBlend mode='normal' in2='shape' result='effect2_innerShadow_849_49845' />
                    </filter>
                  </defs>
                </svg>
              </IconButton>
            </Tooltip>

            <Modal open={openEdit} onClose={handleCloseEdit} sx={styleModal}>
              <Box sx={styleEdit}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <Controller
                      name='content'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          multiline
                          minRows={4}
                          onChange={onChange}
                          inputRef={contentRef}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end' sx={{ display: 'flex' }}>
                                {!isPickerVisible ? (
                                  ''
                                ) : (
                                  <Card className={classes.picker}>
                                    <Picker
                                      data={data}
                                      perLine={6}
                                      maxFrequentRows={0}
                                      searchPosition='none'
                                      onEmojiSelect={handleEmojiSelect}
                                    />
                                  </Card>
                                )}
                                <IconButton onClick={() => setPickerVisible(!isPickerVisible)}>
                                  <EmojiEmotionsIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        ></TextField>
                      )}
                    />
                    {props.emoji && <IconButton>{props.emoji}</IconButton>}
                    <Controller
                      name='favorite'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Android12Switch
                          checked={value}
                          onChange={onChange}
                          inputRef={favoriteRef}
                          sx={{ position: 'absolute', top: 130, left: 170 }}
                        ></Android12Switch>
                      )}
                    />
                    <Controller
                      name='emoji'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          onChange={onChange}
                          inputRef={emojiRef}
                          id='select'
                          variant='standard'
                          sx={{ marginRight: 5, position: 'absolute', top: 130 }}
                          displayEmpty
                          renderValue={selected => {
                            if (selected === '' || !selected) {
                              return <EmojiEmotionsIcon sx={{ paddingTop: 1, paddingLeft: 3 }} />
                            }

                            return selected
                          }}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {emotions.map(e => (
                            <MenuItem key={e.value} value={e.value}>
                              {e.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />

                    {props.photos && props.photos.length > 0 && (
                      <>
                        {fields.map((field, index) => (
                          <CardContent key={field.id}>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                            <CardMedia component='img' height='500' image={props.photos[0]} alt='img' />
                          </CardContent>
                        ))}
                      </>
                    )}
                    <Button type='submit' sx={{ marginTop: 36 }}>
                      Guardar
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Modal>
            <IconButton className={classes.iconButton} onClick={handleOpen} sx={{ marginLeft: 2 }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='48' viewBox='0 0 48 48' fill='none'>
                <g filter='url(#filter0_d_849_49813)'>
                  <path
                    d='M15.0957 18.6924L4.50195 8.09863L16.9707 0.317383L28.502 8.09863L15.0957 18.6924Z'
                    fill='#FF8A65'
                  />
                  <path
                    d='M15.0957 18.6924L4.50195 8.09863L8.5332 3.12988L28.502 8.09863L15.0957 18.6924Z'
                    fill='#FFAB91'
                  />
                  <path
                    d='M21.2832 39.9736H8.9082C7.0332 39.9736 5.43945 38.6611 5.1582 36.7861L1.0332 9.03613H29.1582L24.9395 36.7861C24.6582 38.6611 23.0645 39.9736 21.2832 39.9736Z'
                    fill='#00FFED'
                  />
                  <path
                    d='M28.2207 10.9111H1.9707C0.939453 10.9111 0.0957031 10.0674 0.0957031 9.03613C0.0957031 8.00488 0.939453 7.16113 1.9707 7.16113H28.2207C29.252 7.16113 30.0957 8.00488 30.0957 9.03613C30.0957 10.0674 29.252 10.9111 28.2207 10.9111Z'
                    fill='#F836F4'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_d_849_49813'
                    x='0.0957031'
                    y='0.317383'
                    width='38'
                    height='47.6562'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dx='4' dy='4' />
                    <feGaussianBlur stdDeviation='2' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
                    <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49813' />
                    <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_849_49813' result='shape' />
                  </filter>
                </defs>
              </svg>
            </IconButton>
            <Modal open={open} onClose={handleClose}>
              <Box component='div' sx={style}>
                <Typography variant='h6' component='h2'>
                  Deseas eliminar?
                </Typography>
                <Button
                  onClick={handleDelete}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', fontSize: 'large' }}
                >
                  <div style={{ marginRight: 6 }}>
                    <svg width='22' height='50' viewBox='0 0 47 47' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g filter='url(#filter0_d_849_49960)'>
                        <g filter='url(#filter1_i_849_49960)'>
                          <path
                            d='M21 41C26.5228 41 31.5228 38.7614 35.1421 35.1421C38.7614 31.5228 41 26.5228 41 21C41 15.4772 38.7614 10.4772 35.1421 6.85786C31.5228 3.23858 26.5228 1 21 1C15.4772 1 10.4772 3.23858 6.85786 6.85786C3.23858 10.4772 1 15.4772 1 21C1 26.5228 3.23858 31.5228 6.85786 35.1421C10.4772 38.7614 15.4772 41 21 41Z'
                            fill='#010032'
                          />
                        </g>
                        <path
                          d='M21 41C26.5228 41 31.5228 38.7614 35.1421 35.1421C38.7614 31.5228 41 26.5228 41 21C41 15.4772 38.7614 10.4772 35.1421 6.85786C31.5228 3.23858 26.5228 1 21 1C15.4772 1 10.4772 3.23858 6.85786 6.85786C3.23858 10.4772 1 15.4772 1 21C1 26.5228 3.23858 31.5228 6.85786 35.1421C10.4772 38.7614 15.4772 41 21 41Z'
                          stroke='#00FFED'
                          stroke-width='2'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M13 21L19 27L31 15'
                          stroke='#00FFED'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_849_49960'
                          x='0'
                          y='0'
                          width='50'
                          height='50'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'
                        >
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dx='4' dy='4' />
                          <feGaussianBlur stdDeviation='2' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
                          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49960' />
                          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_849_49960' result='shape' />
                        </filter>
                        <filter
                          id='filter1_i_849_49960'
                          x='0'
                          y='0'
                          width='46'
                          height='46'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'
                        >
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dx='4' dy='4' />
                          <feGaussianBlur stdDeviation='2' />
                          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
                          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0' />
                          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_849_49960' />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  Si
                </Button>

                <Button
                  onClick={handleClose}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', fontSize: 'large' }}
                >
                  <div style={{ marginRight: 6 }}>
                    <svg width='20' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <g filter='url(#filter0_d_849_49966)'>
                        <path
                          d='M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z'
                          fill='#CC3333'
                        />
                        <path
                          d='M18.7 38.4C29.0277 38.4 37.4 30.0277 37.4 19.7C37.4 9.37227 29.0277 1 18.7 1C8.37227 1 0 9.37227 0 19.7C0 30.0277 8.37227 38.4 18.7 38.4Z'
                          fill='#F44336'
                        />
                        <path
                          d='M6.6671 8.5666C8.1671 6.19994 11.3671 4.23327 14.7004 3.63327C15.5338 3.49993 16.3671 3.43327 17.0671 3.69994C17.6004 3.89994 18.0338 4.39993 17.7338 4.9666C17.5004 5.43327 16.8671 5.63327 16.3671 5.79993C13.2402 6.83175 10.5439 8.87159 8.70044 11.5999C8.03377 12.5999 7.03377 15.3666 5.80044 14.6666C4.50044 13.8999 4.7671 11.4999 6.6671 8.5666Z'
                          fill='#FF8A80'
                        />
                        <path
                          d='M33.333 22.6673H6.66634C5.92967 22.6673 5.33301 22.0707 5.33301 21.334V18.6673C5.33301 17.9307 5.92967 17.334 6.66634 17.334H33.333C34.0697 17.334 34.6663 17.9307 34.6663 18.6673V21.334C34.6663 22.0707 34.0697 22.6673 33.333 22.6673Z'
                          fill='#FAFAFA'
                        />
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_849_49966'
                          x='0'
                          y='0'
                          width='48'
                          height='48'
                          filterUnits='userSpaceOnUse'
                          color-interpolation-filters='sRGB'
                        >
                          <feFlood flood-opacity='0' result='BackgroundImageFix' />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dx='4' dy='4' />
                          <feGaussianBlur stdDeviation='2' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
                          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49966' />
                          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_849_49966' result='shape' />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  No
                </Button>
              </Box>
            </Modal>
          </>
        }
        title={'Tú'}
        subheader={props.createdAt}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {props.content}
        </Typography>
      </CardContent>
      {props.photos && props.photos.length > 0 && (
        <>
          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <CardMedia component='img' height='500' image={props.photos} alt='img' />
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  )
}

export default Entries
