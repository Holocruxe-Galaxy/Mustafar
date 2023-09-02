import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

// ** MUI Imports
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Switch
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Cloudinary
// import { Cloudinary } from 'src/@core/utils/cloudinary'

// ** Components
import Entries from 'src/@core/components/diary/Entries'

// ** Redux
import { addDiary, fetchData } from 'src/store/apps/diary'

// ** Utils
import emotions from 'src/@core/utils/emotions'

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 90,
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

interface Diary {
  _id: string
  content: string
  favorite: boolean
  createdAt: string
  updatedAt: string
  emoji?: string
  photos?: string[]
}

export type PostDiary = Omit<Diary, '_id' | 'createdAt' | 'updatedAt' | 'photos'>

const Diary = () => {
  const { data: diaryData } = useSelector((state: RootState) => state.diary)
  const dispatch = useDispatch<AppDispatch>()

  const [checked, setChecked] = useState<boolean>(false)
  const [toSend, setToSend] = useState<boolean>(false)
  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)
  const [isMultiline, setMultiline] = useState<boolean>(false)
  const [file, setFile] = useState<FormData>()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const [diary, setDiary] = useState<PostDiary>({ content: '', favorite: false })

  useEffect(() => {
    dispatch(fetchData())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (diary.content.length && !file) {
      dispatch(addDiary(diary))
      setDiary({ content: '', favorite: false })
    } else if (diary.content.length && file) {
      dispatch(addDiary({ ...diary, file }))
      setDiary({ content: '', favorite: false })
      setFile(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toSend])

  const handleChange = (e: SelectChangeEvent<string>) => {
    setDiary({ ...diary, emoji: e.target.value })
  }

  const handleValue = (e: any) => {
    if (inputRef?.current) {
      inputRef.current.value = e.target.value
      inputRef.current.value.length ? setMultiline(true) : setMultiline(false)
    }
  }

  const handleSwitchChange = () => {
    setDiary({ ...diary, favorite: !diary.favorite })
  }

  const handleEmojiSelect = (emoji: any) => {
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

  const handleChecked = () => {
    setChecked(!checked)
  }

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const formData = new FormData()
    formData.append('file', file as unknown as string)
    console.log(formData.entries())
    console.log(file)
    setFile(formData)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // TODO: Control de caracteres máximo 200.

    e.preventDefault()
    if (inputRef.current && inputRef.current.value.length) {
      setDiary({ ...diary, content: inputRef.current.value })
      setToSend(!toSend)
      inputRef.current.value = ''
    }
  }

  const classes = useStyles()

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              focused={isMultiline ? true : false}
              variant='outlined'
              size='medium'
              multiline={true}
              minRows={isMultiline ? 4 : 0}
              id='myInput'
              label='Qué hay de nuevo? ...'
              inputRef={inputRef}
              onChange={e => handleValue(e)}
              sx={{ marginRight: 3, borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' sx={{ display: 'flex' }}>
                    {!isPickerVisible ? (
                      ''
                    ) : (
                      <Card className={classes.picker} ref={pickerRef}>
                        <Picker
                          data={data}
                          emojiTooltip
                          perLine={10}
                          maxFrequentRows={0}
                          searchPosition='none'
                          onEmojiSelect={handleEmojiSelect}
                        />
                      </Card>
                    )}
                    <IconButton
                      onClick={() => setPickerVisible(!isPickerVisible)}
                      sx={isMultiline ? undefined : { display: 'none' }}
                      className={classes.iconButton}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='27' height='48' viewBox='0 0 48 48' fill='none'>
                        <g filter='url(#filter0_di_849_49992)'>
                          <path
                            d='M24 40C35.0457 40 44 31.0457 44 20C44 8.95431 35.0457 0 24 0C12.9543 0 4 8.95431 4 20C4 31.0457 12.9543 40 24 40Z'
                            fill='#FFDD67'
                          />
                          <path
                            d='M16.3333 18.3991C18.1743 18.3991 19.6667 16.9067 19.6667 15.0658C19.6667 13.2248 18.1743 11.7324 16.3333 11.7324C14.4924 11.7324 13 13.2248 13 15.0658C13 16.9067 14.4924 18.3991 16.3333 18.3991Z'
                            fill='#664E27'
                          />
                          <path
                            d='M31.6663 18.3991C33.5073 18.3991 34.9997 16.9067 34.9997 15.0658C34.9997 13.2248 33.5073 11.7324 31.6663 11.7324C29.8254 11.7324 28.333 13.2248 28.333 15.0658C28.333 16.9067 29.8254 18.3991 31.6663 18.3991Z'
                            fill='#664E27'
                          />
                          <path
                            d='M34.7333 23.3325C31.8667 27.3992 28.4 28.3992 24 28.3992C19.6 28.3992 16.1333 27.3992 13.2667 23.3325C12.8667 22.7992 11.8 23.1325 12.0667 23.9325C13.6 29.2658 18.7333 32.3992 24.0667 32.3992C29.4 32.3992 34.5333 29.2658 36.0667 23.9325C36.2 23.1325 35.1333 22.7992 34.7333 23.3325Z'
                            fill='#664E27'
                          />
                        </g>
                        <defs>
                          <filter
                            id='filter0_di_849_49992'
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
                            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
                            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_849_49992' />
                            <feBlend
                              mode='normal'
                              in='SourceGraphic'
                              in2='effect1_dropShadow_849_49992'
                              result='shape'
                            />
                            <feColorMatrix
                              in='SourceAlpha'
                              type='matrix'
                              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                              result='hardAlpha'
                            />
                            <feOffset dx='4' dy='4' />
                            <feGaussianBlur stdDeviation='2' />
                            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
                            <feColorMatrix
                              type='matrix'
                              values='0 0 0 0 0.9875 0 0 0 0 0.626984 0 0 0 0 0.0411458 0 0 0 0.5 0'
                            />
                            <feBlend mode='normal' in2='shape' result='effect2_innerShadow_849_49992' />
                          </filter>
                        </defs>
                      </svg>
                    </IconButton>

                    <Tooltip title='Al activarlo, se guardará como tus publicaciones favoritas' placement='top'>
                      <Android12Switch
                        sx={{ marginRight: 3 }}
                        onChange={handleSwitchChange}
                        onClick={handleChecked}
                        checked={checked}
                      />
                    </Tooltip>
                    {/* // TODO: Realizar cambios correspondientes con el S3 de imagenes */}
                    {/* <Cloudinary values={diary} setValues={setDiary} /> */}
                    <input type='file' accept='image/*' onChange={fileSelected}></input>
                    <Select
                      id='select'
                      variant='standard'
                      sx={{ marginRight: 5 }}
                      value={diary.emoji || ''}
                      onChange={handleChange}
                      displayEmpty
                      renderValue={selected => {
                        if (selected === '' || !selected) {
                          return (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='35'
                              height='43'
                              viewBox='0 0 51 43'
                              fill='none'
                            >
                              <g filter='url(#filter0_di_849_49985)'>
                                <path
                                  d='M17.8985 16.4709C15.4878 17.173 13.8706 19.239 14.0332 21.4494C14.7991 20.5948 15.9689 19.8571 17.3858 19.372L17.8985 16.4709ZM10.4373 19.8202L8.3055 7.75943C8.28602 7.65058 8.32432 7.5834 8.32163 7.58138C12.2023 5.42736 16.5937 4.28855 21.0206 4.28855C21.1288 4.28855 21.2377 4.29997 21.3465 4.30131C22.2838 3.3963 23.4783 2.76743 24.8127 2.55445C26.0818 2.35154 27.3691 2.24875 28.6544 2.19701C27.9832 1.25976 27.0097 0.569074 25.848 0.382966C24.2416 0.126983 22.6271 0 21.02 0C15.8694 0 10.7874 1.30477 6.23077 3.83369C4.60686 4.73534 3.73679 6.61657 4.07071 8.50453L6.20255 20.5653C7.15862 25.9752 15.3622 30.1112 19.9389 30.1112C20.1801 30.1112 20.3924 30.0803 20.6115 30.0574C19.7031 28.9099 18.6671 27.3377 17.9576 25.5169C14.7588 24.6449 10.8317 22.0488 10.4373 19.8202ZM16.9914 10.5846C16.9424 10.3078 16.8416 10.0559 16.718 9.81871C16.1637 10.4173 15.3292 10.8769 14.3449 11.0496C13.3607 11.2229 12.4187 11.0764 11.6924 10.7022C11.6575 10.9669 11.6494 11.2384 11.6984 11.5152C11.9564 12.9731 13.3499 13.9467 14.8119 13.69C16.2732 13.4334 17.2494 12.0426 16.9914 10.5846ZM44.7692 8.12291C38.7909 4.80521 31.9076 3.59383 25.152 4.67286C23.3171 4.96579 21.8544 6.43719 21.5212 8.32514L19.3893 20.3859C18.3553 26.2345 25.7909 33.5727 30.0257 34.3171C34.2605 35.0622 43.7634 30.7031 44.7974 24.8545L46.9293 12.7937C47.2632 10.9051 46.3931 9.02388 44.7692 8.12291ZM26.4111 14.6266C26.6691 13.1686 28.0625 12.1951 29.5245 12.4524C30.9865 12.7098 31.962 14.0999 31.7047 15.5578C31.6557 15.8346 31.5549 16.0866 31.4313 16.3238C30.877 15.7251 30.0425 15.2656 29.0582 15.0929C28.0739 14.9195 27.132 15.066 26.4057 15.4402C26.3701 15.1749 26.362 14.9034 26.4111 14.6266ZM31.1457 27.9807C27.4047 27.3229 24.8624 23.9985 25.1634 20.3953C26.5474 22.1112 28.94 23.4973 31.8478 24.0086C34.7557 24.5199 37.4794 24.0335 39.3681 22.8933C38.4154 26.383 34.886 28.6385 31.1457 27.9807ZM39.9002 17.8126C39.3459 17.214 38.5108 16.7544 37.5265 16.5817C36.5422 16.4084 35.6002 16.5549 34.8739 16.9291C34.839 16.6644 34.8309 16.393 34.88 16.1161C35.138 14.6582 36.5314 13.6846 37.9934 13.9413C39.4547 14.1986 40.431 15.5887 40.1736 17.0467C40.1246 17.3242 40.0238 17.5761 39.9002 17.8126Z'
                                  fill='#00FFED'
                                />
                              </g>
                              <defs>
                                <filter
                                  id='filter0_di_849_49985'
                                  x='0'
                                  y='0'
                                  width='51'
                                  height='42.4004'
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
                                  <feBlend
                                    mode='normal'
                                    in2='BackgroundImageFix'
                                    result='effect1_dropShadow_849_49985'
                                  />
                                  <feBlend
                                    mode='normal'
                                    in='SourceGraphic'
                                    in2='effect1_dropShadow_849_49985'
                                    result='shape'
                                  />
                                  <feColorMatrix
                                    in='SourceAlpha'
                                    type='matrix'
                                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                    result='hardAlpha'
                                  />
                                  <feOffset dx='4' dy='4' />
                                  <feGaussianBlur stdDeviation='2' />
                                  <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
                                  <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
                                  <feBlend mode='normal' in2='shape' result='effect2_innerShadow_849_49985' />
                                </filter>
                              </defs>
                            </svg>
                          )
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
                    <Button variant='contained' type='submit' sx={isMultiline ? undefined : { display: 'none' }}>
                      Enviar{' '}
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='44' viewBox='0 0 43 44' fill='none'>
                        <path
                          d='M1.2666 24.7425L6.75582 19.3339L16.1016 17.6777L15.1778 22.569L2.54316 26.4524L1.72684 26.0997L1.2666 24.7425Z'
                          fill='#010032'
                        />
                        <path
                          d='M7.7066 20.7208L1.74707 26.1361L6.13105 28.2727L12.786 24.8763V23.2739L14.1465 19.6055L7.7066 20.7208ZM21.8093 30.258L18.9303 31.5077L16.2125 37.2691C16.2125 37.2691 18.6044 42.5668 18.7119 42.5668C18.8194 42.5668 20.18 42.6743 20.18 42.6743L25.0175 37.2657L26.2403 28.0274L21.8093 30.258Z'
                          fill='#010032'
                        />
                        <path
                          d='M18.9804 34.5212C18.9804 34.5212 20.5829 34.1954 21.725 33.6511C22.8672 33.1069 24.2782 32.2939 24.2782 32.2939L23.7608 36.8056L18.705 42.5602C18.705 42.5602 18.5068 42.315 17.6669 40.4875C16.9984 39.0295 16.7666 38.5088 16.7666 38.5088L18.9804 34.5212Z'
                          fill='#010032'
                        />
                        <path
                          d='M10.6085 27.7421C10.6085 27.7421 8.68019 27.5809 6.56714 30.2516C4.63886 32.6905 3.73519 36.6612 3.38581 37.6825C3.03644 38.7037 2.19995 38.912 2.47878 39.379C2.75761 39.8459 3.96362 39.8191 5.45183 39.6343C6.94003 39.4495 8.21659 38.9826 8.21659 38.9826C8.21659 38.9826 8.15276 39.1438 7.93776 39.4932C7.8605 39.6175 7.59175 39.7955 7.6119 39.9803C7.65894 40.4204 11.4282 40.4305 14.4382 37.3331C17.69 33.9905 16.1111 31.2493 16.1111 31.2493L10.6085 27.7421Z'
                          fill='#F836F4'
                        />
                        <path
                          d='M11.1901 29.2979C11.1901 29.2979 9.11068 29.4087 7.39068 32.0794C5.67068 34.7501 4.87114 37.8441 5.03575 38.0524C5.197 38.2607 8.40185 37.1017 9.17114 37.3335C9.69857 37.4947 9.42646 38.0289 9.56755 38.17C9.68513 38.2875 11.0759 38.4857 13.3267 36.0468C15.5808 33.6079 15.0467 30.1814 15.0467 30.1814L11.1901 29.2979Z'
                          fill='#FBF0B4'
                        />
                        <path
                          d='M12.2111 25.6523C12.2111 25.6523 11.1663 26.5829 10.7934 27.117C10.4205 27.6512 10.4205 27.6982 10.444 27.8595C10.4676 28.0207 10.8539 29.7911 12.463 31.3431C14.4383 33.2479 16.202 33.5032 16.4573 33.5032C16.7126 33.5032 18.4091 31.5984 18.4091 31.5984L12.2111 25.6523Z'
                          fill='#858585'
                        />
                        <path
                          d='M16.8301 31.2962C16.8301 31.2962 18.5232 32.4082 21.3619 31.4541C25.242 30.1507 28.0873 27.2348 31.6113 23.5529C35.011 19.9987 37.8631 15.5878 37.8631 15.5878L35.8643 8.89258L16.8301 31.2962Z'
                          fill='#437687'
                        />
                        <path
                          d='M22.8408 27.6309L23.3078 26.1797L24.4768 26.3443C24.4768 26.3443 25.3671 26.7642 26.0221 27.0699C26.6772 27.3756 27.5204 27.6074 27.5204 27.6074L25.8575 29.0116C25.8575 29.0116 24.9505 28.669 24.2887 28.3801C23.5429 28.0542 22.8408 27.6309 22.8408 27.6309Z'
                          fill='#3F545F'
                        />
                        <path
                          d='M28.3262 6.06738C28.3262 6.06738 25.0944 7.94191 20.4619 12.3259C16.2862 16.2765 13.1922 19.8509 12.443 22.8911C11.8182 25.4375 12.1508 26.9829 13.5718 28.6525C15.0734 30.4195 16.8337 31.2963 16.8337 31.2963C16.8337 31.2963 18.1573 31.3164 23.6801 27.0668C30.5702 21.7624 36.0897 12.8802 36.0897 12.8802L28.3262 6.06738Z'
                          fill='#8DAFBF'
                        />
                        <path
                          d='M34.9983 14.7008C34.9983 14.7008 32.1865 13.5015 30.1809 10.7032C28.1888 7.92499 28.3467 6.0471 28.3467 6.0471C28.3467 6.0471 30.013 4.7403 33.7587 3.24538C36.2782 2.24092 39.7081 1.72694 40.8369 2.56342C41.9656 3.39991 40.0642 7.59577 40.0642 7.59577L36.6007 14.3011L34.9983 14.7008Z'
                          fill='#00FFED'
                        />
                        <path
                          d='M22.9009 27.6551C22.9009 27.6551 20.4721 26.4155 18.9268 24.6518C16.0041 21.3227 15.3994 17.6677 15.3994 17.6677L16.8675 15.9443C16.8675 15.9443 17.2336 19.8278 20.3679 23.1838C22.4104 25.3707 24.5436 26.3718 24.5436 26.3718C24.5436 26.3718 24.117 26.7313 23.6601 27.0807C23.3679 27.3057 22.9009 27.6551 22.9009 27.6551Z'
                          fill='#6896A5'
                        />
                        <path
                          d='M37.8636 15.5882C37.8636 15.5882 39.3216 13.8313 40.7023 9.87059C42.6305 4.34777 40.9509 2.6748 40.9509 2.6748C40.9509 2.6748 40.3831 5.30184 38.4112 8.95348C36.8289 11.8795 34.9141 14.6644 34.9141 14.6644C34.9141 14.6644 35.9689 15.1381 36.54 15.3027C37.2589 15.511 37.8636 15.5882 37.8636 15.5882Z'
                          fill='#010032'
                        />
                        <path
                          d='M13.3738 24.0472C13.8105 24.4638 14.4723 24.027 14.9056 23.0058C15.3423 21.9845 15.3356 21.4134 14.9997 21.1716C14.5831 20.8692 13.8844 21.531 13.5787 22.1189C13.2427 22.7706 13.0445 23.7314 13.3738 24.0472ZM28.538 7.4082C28.538 7.4082 25.9815 9.24578 23.2537 11.7452C20.7509 14.0396 19.0914 15.8335 18.863 16.2501C18.6211 16.6969 18.6177 17.3284 18.8059 17.6509C18.994 17.9734 19.4106 18.1414 19.7902 17.8592C20.1698 17.5737 22.8741 14.5838 25.3163 12.4473C27.5503 10.4921 29.2737 9.2525 29.2737 9.2525C29.2737 9.2525 29.9724 8.01625 29.8582 7.73406C29.744 7.44852 28.538 7.4082 28.538 7.4082Z'
                          fill='#B3E1EE'
                        />
                        <path
                          d='M28.5381 7.40775C28.5381 7.40775 30.4261 5.95985 32.482 4.94196C34.3935 3.99462 36.2949 3.20517 36.6375 3.89048C36.9634 4.5422 34.8336 5.42907 32.959 6.62501C31.0845 7.82095 29.2805 9.24868 29.2805 9.24868C29.2805 9.24868 29.005 8.74478 28.827 8.27782C28.7141 7.99359 28.6176 7.70308 28.5381 7.40775Z'
                          fill='#010032'
                        />
                        <path
                          d='M30.0971 13.8315C28.2259 12.1081 25.6224 12.5717 24.3391 14.1036C23.0222 15.6825 23.1196 18.0945 24.675 19.5458C26.0893 20.8627 28.7197 21.1617 30.3053 19.314C31.7163 17.6746 31.6289 15.2391 30.0971 13.8315Z'
                          fill='#E1E1E1'
                        />
                        <path
                          d='M25.306 14.7109C24.194 15.8027 24.2545 17.9661 25.5781 18.9538C26.7337 19.8171 28.3731 19.7735 29.401 18.722C30.429 17.6705 30.429 15.759 29.4649 14.7713C28.3563 13.6392 26.5792 13.4612 25.306 14.7109Z'
                          fill='#3F545F'
                        />
                        <path
                          d='M16.797 26.4757C16.797 26.4757 18.8764 24.366 19.1049 24.5944C19.3333 24.8229 19.3031 26.1028 18.3087 27.5272C17.311 28.9516 15.1173 31.4879 13.3805 33.1978C11.6672 34.8809 9.25182 36.8058 9.02338 36.7722C8.84533 36.7453 8.12307 36.3859 7.83416 36.0365C7.55197 35.6905 8.39518 34.0544 8.73447 33.5136C9.07713 32.9727 16.797 26.4757 16.797 26.4757Z'
                          fill='#00FFED'
                        />
                        <path
                          d='M7.13157 34.8603C7.1047 35.344 7.84376 36.0495 7.84376 36.0495L19.1044 24.5974C19.1044 24.5974 18.577 24.0028 17.0249 24.9669C15.4595 25.9411 14.0888 27.1102 12.0665 29.0687C9.24798 31.8032 7.15845 34.3765 7.13157 34.8603Z'
                          fill='#010032'
                        />
                        <path
                          d='M6.40274 13.0585C6.02985 13.4314 6.01305 14.0294 6.42961 14.372C6.79914 14.6777 7.40047 14.4795 7.62555 14.2041C7.85063 13.9286 7.82375 13.3306 7.52477 13.035C7.22578 12.736 6.63117 12.8334 6.40274 13.0585Z'
                          fill='white'
                        />
                        <path
                          opacity='0.5'
                          d='M13.7806 12.622C13.4984 12.9344 13.5891 13.398 13.8512 13.5693C14.1132 13.7406 14.5063 13.7238 14.6977 13.4887C14.8691 13.277 14.8892 12.8538 14.6272 12.5917C14.3988 12.3666 13.962 12.4204 13.7806 12.622Z'
                          fill='white'
                        />
                        <path
                          d='M18.6612 4.63965C18.6612 4.63965 19.071 3.47058 19.3129 3.45714C19.5581 3.44371 19.9109 4.62621 19.9109 4.62621C19.9109 4.62621 21.1236 4.63965 21.2042 4.81769C21.3084 5.04613 20.4282 5.81207 20.4282 5.81207C20.4282 5.81207 20.7138 6.95425 20.5794 7.09199C20.4282 7.24316 19.3834 6.64183 19.3834 6.64183C19.3834 6.64183 18.3084 7.39097 18.0766 7.18605C17.8751 7.008 18.295 5.79863 18.295 5.79863C18.295 5.79863 17.2872 5.06293 17.3409 4.858C17.4182 4.5691 18.6612 4.63965 18.6612 4.63965ZM32.5891 32.6703C32.9956 32.8953 33.5063 32.7677 33.6944 32.3343C33.8657 31.948 33.5499 31.4878 33.2644 31.3635C32.9788 31.2392 32.4783 31.4038 32.2969 31.7296C32.1188 32.0521 32.3439 32.5359 32.5891 32.6703ZM38.3606 22.7635C38.1288 22.404 37.6282 22.2864 37.3024 22.5753C36.9866 22.8575 37.0638 23.301 37.2419 23.5261C37.4199 23.7511 37.897 23.8351 38.1859 23.6503C38.4748 23.4656 38.5016 22.9785 38.3606 22.7635Z'
                          fill='white'
                        />
                      </svg>
                    </Button>
                  </InputAdornment>
                )
              }}
            ></TextField>
          </form>
        </CardContent>
        <CardContent>
          {diaryData.length ? (
            diaryData.map(entrie => (
              <Stack spacing={2} key={entrie._id} direction='column' marginTop={5}>
                <Entries id={entrie._id} props={entrie} />
              </Stack>
            ))
          ) : (
            <Container sx={{ textAlign: 'center', marginTop: 62 }} fixed>
              <SentimentVeryDissatisfiedIcon sx={{ color: '#91A7B8' }} />
              <Typography variant='h5' sx={{ color: '#91A7B8' }}>
                No hay entradas publicadas
              </Typography>
            </Container>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default Diary
