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
  IconButton,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Switch,
  InputAdornment
} from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Components
import Entries from 'src/@core/components/diary/Entries'

// ** Redux
import { addDiary, addDiaryWithPhoto, fetchData } from 'src/store/apps/diary'

// ** Utils
import emotions from 'src/@core/utils/emotions'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'

// ** Icon Components
import UploadButton from 'src/@core/icons/diary/UploadButton'
import Rocket from 'src/@core/icons/diary/Rocket'
import ArtIcon from 'src/@core/icons/diary/ArtIcon'

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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path d="M0 12.8765L3.12791 9.79456L8.45341 8.85083L7.92699 11.638L0.727422 13.8509L0.262255 13.6499L0 12.8765Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/><path d="M3.67033 10.5852L0.274414 13.671L2.77253 14.8885L6.5647 12.9532V12.0401L7.33998 9.94971L3.67033 10.5852ZM11.7064 16.0199L10.0659 16.732L8.51725 20.0149C8.51725 20.0149 9.88021 23.0337 9.94147 23.0337C10.0027 23.0337 10.778 23.095 10.778 23.095L13.5346 20.013L14.2313 14.7488L11.7064 16.0199Z" fill="${encodeURIComponent(
          '#46476B'
        )}"/>
        <path d="M10.0945 18.4491C10.0945 18.4491 11.0076 18.2634 11.6585 17.9533C12.3093 17.6432 13.1133 17.1799 13.1133 17.1799L12.8185 19.7508L9.93754 23.0299C9.93754 23.0299 9.8246 22.8902 9.34603 21.8488C8.96509 21.018 8.83301 20.7213 8.83301 20.7213L10.0945 18.4491Z" fill="${encodeURIComponent(
          '#46476B'
        )}/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },

  //<path d="M8.86914 16.6117C8.86914 16.6117 9.83393 17.2453 11.4515 16.7017C13.6625 15.9589 15.2839 14.2974 17.2919 12.1993C19.2292 10.174 20.8544 7.6606 20.8544 7.6606L19.7154 3.84546L8.86914 16.6117Z" fill="${encodeURIComponent(
  //   '#437687'
  // )}/><path d="M15.4197 2.23511C15.4197 2.23511 13.5782 3.30327 10.9384 5.80139C8.55896 8.05257 6.79592 10.0893 6.36903 11.8218C6.01298 13.2728 6.20249 14.1533 7.01223 15.1047C7.86791 16.1116 8.87098 16.6113 8.87098 16.6113C8.87098 16.6113 9.6252 16.6227 12.7723 14.2012C16.6984 11.1786 19.8436 6.11724 19.8436 6.11724L15.4197 2.23511Z" fill="${encodeURIComponent(
  //   '#8DAFBF'
  // )}/><path d="M5.32358 14.5863C5.32358 14.5863 4.22479 14.4944 3.02071 16.0162C1.92192 17.406 1.40699 19.6687 1.2079 20.2506C1.00882 20.8325 0.532165 20.9512 0.691049 21.2173C0.849933 21.4834 1.53716 21.4681 2.38518 21.3628C3.2332 21.2575 3.96062 20.9914 3.96062 20.9914C3.96062 20.9914 3.92425 21.0833 3.80173 21.2824C3.75771 21.3532 3.60457 21.4547 3.61605 21.5599C3.64285 21.8107 5.79066 21.8165 7.50584 20.0515C9.35886 18.1468 8.45915 16.5848 8.45915 16.5848L5.32358 14.5863Z" fill="${encodeURIComponent(
  //   '#F836F4'
  // )}/><path d="M9.91267 1.42145C9.91267 1.42145 10.1462 0.75528 10.284 0.747623C10.4238 0.739966 10.6248 1.41379 10.6248 1.41379C10.6248 1.41379 11.3158 1.42145 11.3618 1.5229C11.4211 1.65307 10.9196 2.08953 10.9196 2.08953C10.9196 2.08953 11.0823 2.74038 11.0057 2.81886C10.9196 2.905 10.3242 2.56235 10.3242 2.56235C10.3242 2.56235 9.71167 2.98923 9.57959 2.87246C9.46473 2.771 9.70401 2.08187 9.70401 2.08187C9.70401 2.08187 9.12973 1.66264 9.16036 1.54587C9.20439 1.38125 9.91267 1.42145 9.91267 1.42145ZM17.8492 17.3941C18.0809 17.5224 18.3718 17.4496 18.479 17.2027C18.5766 16.9825 18.3967 16.7203 18.234 16.6494C18.0713 16.5786 17.7861 16.6724 17.6827 16.8581C17.5812 17.0419 17.7095 17.3175 17.8492 17.3941ZM21.1379 11.7489C21.0059 11.5441 20.7206 11.4771 20.5349 11.6417C20.355 11.8025 20.399 12.0552 20.5005 12.1835C20.6019 12.3117 20.8738 12.3596 21.0384 12.2543C21.203 12.149 21.2183 11.8714 21.1379 11.7489Z" fill="${encodeURIComponent(
  //   '#FFF'
  // )}/><path opacity="0.5" d="M7.13093 5.97028C6.97013 6.14831 7.02181 6.41248 7.17113 6.51011C7.32044 6.60774 7.54441 6.59816 7.65352 6.46417C7.75115 6.34357 7.76263 6.10237 7.61332 5.95306C7.48315 5.8248 7.2343 5.85543 7.13093 5.97028Z" fill="${encodeURIComponent(
  //   '#FFF'
  // )}/><path d="M2.92667 6.21854C2.71419 6.43102 2.70461 6.77176 2.94198 6.96702C3.15255 7.14121 3.49521 7.02827 3.62346 6.8713C3.75172 6.71433 3.73641 6.37359 3.56604 6.20514C3.39567 6.03477 3.05684 6.09028 2.92667 6.21854Z" fill="${encodeURIComponent(
  //   '#FFF'
  // )}/><path d="M16.3846 6.58705C15.3184 5.60503 13.8348 5.86919 13.1036 6.7421C12.3532 7.64181 12.4087 9.01625 13.295 9.84321C14.1009 10.5936 15.5998 10.764 16.5033 9.71113C17.3073 8.77697 17.2575 7.38912 16.3846 6.58705Z" fill="${encodeURIComponent(
  //   '#E1E1E1'
  // )}/><path d="M13.6563 7.08821C13.0227 7.71035 13.0571 8.94314 13.8113 9.50594C14.4698 9.9979 15.404 9.97302 15.9898 9.37385C16.5755 8.77469 16.5755 7.68547 16.0261 7.12267C15.3944 6.47756 14.3818 6.37611 13.6563 7.08821Z" fill="${encodeURIComponent(
  //   '#2B2C4B'
  // )}/><path d="M6.89983 12.4802C7.14868 12.7175 7.52579 12.4687 7.77273 11.8867C8.02159 11.3048 8.01776 10.9794 7.82633 10.8415C7.58896 10.6693 7.1908 11.0464 7.0166 11.3814C6.82517 11.7527 6.71223 12.3002 6.89983 12.4802ZM15.5408 2.99878C15.5408 2.99878 14.0841 4.04588 12.5297 5.4701C11.1036 6.77755 10.1579 7.79976 10.0277 8.03713C9.88991 8.29173 9.888 8.65161 9.9952 8.83538C10.1024 9.01915 10.3398 9.11487 10.5561 8.95407C10.7724 8.79136 12.3134 7.08766 13.7051 5.87018C14.978 4.75608 15.9601 4.04971 15.9601 4.04971C15.9601 4.04971 16.3582 3.34526 16.2931 3.18446C16.2281 3.02175 15.5408 2.99878 15.5408 2.99878Z" fill="${encodeURIComponent(
  //   '#B3E1EE'
  // )}/>

  //   <path d="M12.2939 14.523L12.56 13.696L13.2262 13.7898C13.2262 13.7898 13.7335 14.0291 14.1068 14.2033C14.48 14.3775 14.9605 14.5096 14.9605 14.5096L14.013 15.3098C14.013 15.3098 13.4961 15.1145 13.119 14.9499C12.694 14.7642 12.2939 14.523 12.2939 14.523Z" fill="#2B2C4B"/>
  //   <path d="M5.65471 15.4727C5.65471 15.4727 4.46978 15.5358 3.48967 17.0577C2.50957 18.5795 2.05397 20.3426 2.14777 20.4612C2.23965 20.5799 4.06587 19.9195 4.50423 20.0516C4.80477 20.1435 4.64972 20.4478 4.73012 20.5282C4.79712 20.5952 5.58962 20.7082 6.87218 19.3184C8.15666 17.9287 7.85229 15.9761 7.85229 15.9761L5.65471 15.4727Z" fill="#FBF0B4"/>
  //   <path d="M6.23733 13.3953C6.23733 13.3953 5.64199 13.9255 5.42951 14.2299C5.21703 14.5343 5.21703 14.5611 5.23043 14.6529C5.24383 14.7448 5.46397 15.7536 6.3809 16.638C7.50649 17.7234 8.51148 17.8689 8.65697 17.8689C8.80245 17.8689 9.76916 16.7835 9.76916 16.7835L6.23733 13.3953Z" fill="#858585"/>
  //   <path d="M8.8496 13.8648C8.8496 13.8648 10.0345 12.6626 10.1647 12.7928C10.2949 12.923 10.2776 13.6523 9.71102 14.464C9.14249 15.2756 7.89247 16.7209 6.90279 17.6953C5.92652 18.6543 4.55016 19.7512 4.41999 19.732C4.31853 19.7167 3.90696 19.5119 3.74234 19.3128C3.58154 19.1156 4.06202 18.1834 4.25536 17.8752C4.45062 17.567 8.8496 13.8648 8.8496 13.8648Z" fill="#2B2C4B"/>
  //   <path d="M3.3422 18.6426C3.32689 18.9182 3.74803 19.3202 3.74803 19.3202L10.1647 12.7945C10.1647 12.7945 9.86412 12.4557 8.97972 13.0051C8.08768 13.5602 7.30665 14.2264 6.15426 15.3424C4.54819 16.9006 3.35752 18.3669 3.3422 18.6426Z" fill="#2B2C4B"/>
  //   <path d="M12.3273 14.5364C12.3273 14.5364 10.9433 13.8301 10.0627 12.8251C8.3973 10.928 8.05273 8.8453 8.05273 8.8453L8.88927 7.86328C8.88927 7.86328 9.09793 10.0762 10.8839 11.9885C12.0478 13.2347 13.2634 13.8052 13.2634 13.8052C13.2634 13.8052 13.0203 14.01 12.7599 14.2091C12.5934 14.3373 12.3273 14.5364 12.3273 14.5364Z" fill="#00FFED"/>
  //   <path d="M19.2216 7.15495C19.2216 7.15495 17.6194 6.47155 16.4766 4.87697C15.3414 3.29387 15.4314 2.22379 15.4314 2.22379C15.4314 2.22379 16.3808 1.47914 18.5153 0.627293C19.951 0.0549272 21.9054 -0.237956 22.5486 0.238697C23.1918 0.71535 22.1083 3.10627 22.1083 3.10627L20.1347 6.92715L19.2216 7.15495Z" fill="#46476B"/>
  //   <path d="M15.54 2.99879C15.54 2.99879 16.6159 2.17374 17.7874 1.59372C18.8766 1.05389 19.9601 0.60404 20.1553 0.99455C20.341 1.36592 19.1274 1.87129 18.0592 2.55276C16.9911 3.23424 15.9631 4.04781 15.9631 4.04781C15.9631 4.04781 15.8061 3.76067 15.7047 3.49459C15.6403 3.33262 15.5853 3.16708 15.54 2.99879Z" fill="#00FFED"/>
  //   <path d="M20.8546 7.66045C20.8546 7.66045 21.6853 6.65929 22.4721 4.40236C23.5709 1.25531 22.6138 0.302002 22.6138 0.302002C22.6138 0.302002 22.2903 1.79896 21.1666 3.87977C20.265 5.5471 19.1738 7.13403 19.1738 7.13403C19.1738 7.13403 19.7749 7.40394 20.1003 7.49774C20.51 7.61642 20.8546 7.66045 20.8546 7.66045Z" fill="#282831"/>

  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
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
      console.log('entre!')
      dispatch(addDiaryWithPhoto({ ...diary, file }))
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

    setPickerVisible(!isPickerVisible)
  }

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const formData = new FormData()
    formData.append('photos', file as unknown as string)
    setFile(formData)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current && inputRef.current.value.length) {
      setDiary({ ...diary, content: inputRef.current.value })
      setToSend(!toSend)
      inputRef.current.value = ''
    }
  }

  const classes = useStyles()

  // Vars
  const diaryCards = [
    {
      name: 'DIARIO',
      icon: '',
      href: ''
    },
    {
      name: 'ORGANIZADOR',
      icon: '',
      href: ''
    }
  ]

  return (
    <>
      <Box component='div' sx={{ mb: 5 }}>
        <CardButtons data={diaryCards} />
      </Box>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box
            sx={
              isMultiline
                ? { backgroundColor: '#0e2b42', height: '11rem', padding: 3, borderRadius: 1 }
                : { backgroundColor: '#0e2b42', height: '5rem', padding: 3, borderRadius: 1 }
            }
            component='div'
          >
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                focused={isMultiline ? true : false}
                variant='outlined'
                size='medium'
                multiline={true}
                minRows={isMultiline ? 5 : 0}
                id='myInput'
                label='Qué hay de nuevo? ...'
                inputRef={inputRef}
                onChange={e => handleValue(e)}
                sx={{ width: '80%', marginRight: 3, borderRadius: 2 }}
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
                        <IconButton />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              ></TextField>
              <Box display='flex' justifyContent='center' component='div'>
                <Tooltip title='Al activarlo, se guardará como tus publicaciones favoritas' placement='top'>
                  <MaterialUISwitch sx={{ marginRight: 3 }} onClick={handleSwitchChange} checked={diary.favorite} />
                </Tooltip>

                <input
                  type='file'
                  accept='image/*'
                  onChange={fileSelected}
                  style={{ display: 'none' }}
                  id='uploadButton'
                ></input>
                <label htmlFor='uploadButton' style={{ marginRight: 15 }}>
                  <UploadButton />
                </label>

                <Select
                  id='select'
                  value={diary.emoji || ''}
                  variant='standard'
                  sx={{ height: '3rem' }}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={selected => {
                    if (selected === '' || !selected) {
                      return (
                        <span style={{ position: 'absolute', top: 0, right: 50 }}>
                          <ArtIcon />
                        </span>
                      )
                    }

                    return selected
                  }}
                >
                  {emotions.map(e => (
                    <MenuItem key={e.value} value={e.value}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Button
                variant='contained'
                type='submit'
                sx={isMultiline ? { position: 'absolute', top: '25.5rem', right: '10rem' } : { display: 'none' }}
              >
                Enviar
                <div style={{ paddingLeft: 6 }}>
                  <Rocket />
                </div>
              </Button>
            </form>
          </Box>
        </CardContent>
        <CardContent>
          {diaryData.length ? (
            diaryData.map(entrie => (
              <Stack spacing={2} key={entrie._id} direction='column' marginTop={3}>
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
