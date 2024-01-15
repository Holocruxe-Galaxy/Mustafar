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

//import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Components
import Entries from 'src/@core/components/diary/Entries'
import { ActiveDiary, ActiveOrganizer, InactiveDiary, InactiveOrganizer } from 'src/views/components/icons/index'

// ** Redux
import { addDiary, addDiaryWithPhoto, fetchData } from 'src/store/apps/diary'

// ** Utils
import emotions from 'src/@core/utils/emotions'
import CardButtons from 'src/views/components/horizontalBar/CardButtons'

// ** Icon Components
import UploadButton from 'src/@core/icons/diary/UploadButton'
import IconEmojiButton from 'src/@core/icons/diary/IconEmojiButton'
import Send from 'src/@core/icons/diary/Send'
import ArtIcon from 'src/@core/icons/diary/ArtIcon'
import { handleKeyDown } from 'src/libs/helpers/handle-key-down'

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 92,
    right: 20,
    zIndex: 9999
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:active': {
      backgroundColor: 'transparent'
    },
    '& .MuiIconButton-label': {
      transition: 'none'
    }
  }
}))

const CustomSwitch = styled(Switch)(() => ({
  width: '50px',
  height: '24px',
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    padding: '1px',
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundImage: 'linear-gradient(180deg, #00FFED 0%, #D5AEE2 80%)'
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(180deg, #00FFED 0%, #D5AEE2 80%)',
    backgroundColor: 'transparent',
    width: '18px',
    height: '18px',
    margin: '1.7px'
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    backgroundImage: 'none',
    backgroundColor: '#010032',
    width: '19px',
    height: '19px',
    margin: '1.7px'
  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: '#010032',
    opacity: '1 !important',
    '&:after': {
      content: '"On"',
      left: '6px',
      color: '#010032',
      fontSize: '11px',
      position: 'absolute',
      top: '3.5px'
    },
    '&:before': {
      content: '"Off"',
      right: '5px',
      color: 'white',
      fontSize: '11px',
      position: 'absolute',
      top: '3.8px'
    }
  },
  '& .Mui-checked': {
    color: 'white !important',
    transform: 'translateX(26px) !important'
  }
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  width: 1,
  height: 1,
  overflow: 'hidden',
  whiteSpace: 'nowrap'
})

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

  const pickerToggleHandler = () => {
    setPickerVisible(prevState => !prevState)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event: any) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setPickerVisible(false)
    }
  }

  useEffect(() => {
    dispatch(fetchData())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (diary.content.length && !file) {
      dispatch(addDiary(diary))
      setDiary({ content: '', favorite: false })
    } else if (diary.content.length && file) {
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
  }

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const formData = new FormData()
    formData.append('photos', file as unknown as string)
    setFile(formData)
  }

  const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault()
    if (inputRef.current && inputRef.current.value.length) {
      setDiary({ ...diary, content: inputRef.current.value })
      setToSend(!toSend)
      inputRef.current.value = ''
    }
  }

  const classes = useStyles()

  // const
  const diaryCards = [
    {
      name: 'DIARIO',
      activeIcon: <ActiveDiary />,
      inactiveIcon: <InactiveDiary />,
      href: 'apps/diary'
    },
    {
      name: 'ORGANIZADOR',
      activeIcon: <ActiveOrganizer />,
      inactiveIcon: <InactiveOrganizer />,
      href: ''
    }
  ]

  return (
    <>
      <Box component='div' sx={{ mb: 5 }}>
        <CardButtons data={diaryCards} />
      </Box>
      <Card sx={{ height: '100%', mb: 5 }}>
        <CardContent>
          <Box
            sx={{
              backgroundColor: 'customColors.darkBg',
              borderRadius: 1,
              display: 'flex',
              height: '9.4 rem',
              justifyContent: 'center',
              p: 3
            }}
            component='div'
          >
            <Box
              sx={
                isMultiline
                  ? { backgroundColor: 'background.paper', height: '9.4rem', p: 3, borderRadius: 1, width: '100%' }
                  : { backgroundColor: 'background.paper', height: '5rem', p: 3, borderRadius: 1, width: '100%' }
              }
              component='div'
            >
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  focused={isMultiline ? true : false}
                  variant='outlined'
                  onKeyDown={e => handleKeyDown(e, onSubmit, inputRef)}
                  size='medium'
                  multiline={true}
                  minRows={isMultiline ? 4 : 0}
                  id='myInput'
                  label='Qué hay de nuevo? ...'
                  inputRef={inputRef}
                  onChange={e => handleValue(e)}
                  sx={{
                    width: '80%',
                    mr: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#00FFED'
                      }
                    },
                    '& label': {
                      color: '#00FFED'
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end' sx={{ display: 'flex' }}>
                        {!isPickerVisible ? (
                          ''
                        ) : (
                          <div className={classes.picker} ref={pickerRef}>
                            <Picker
                              data={data}
                              emojiTooltip
                              perLine={10}
                              maxFrequentRows={0}
                              searchPosition='none'
                              onEmojiSelect={handleEmojiSelect}
                            />
                          </div>
                        )}
                        <IconButton
                          onClick={e => {
                            e.stopPropagation()
                            pickerToggleHandler()
                          }}
                          sx={isMultiline ? undefined : { display: 'none' }}
                          className={classes.iconButton}
                          aria-expanded={isPickerVisible ? 'true' : 'false'}
                        >
                          <IconEmojiButton />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                ></TextField>
                <div>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pt: 2,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    <Tooltip title='Al activarlo, se guardará como tus publicaciones favoritas' placement='top'>
                      <CustomSwitch sx={{ mr: 3, mt: 1.5 }} onClick={handleSwitchChange} checked={diary.favorite} />
                    </Tooltip>

                    <Button
                      component='label'
                      endIcon={<UploadButton />}
                      sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '50%',
                        width: '2rem',
                        height: '2rem',
                        minWidth: 'auto',
                        mr: 3.2,
                        mt: 1
                      }}
                      className={classes.iconButton}
                    >
                      <VisuallyHiddenInput type='file' accept='image/*' onChange={fileSelected} />
                    </Button>

                    <Select
                      id='select'
                      value={diary.emoji || ''}
                      sx={{ height: '2.5rem', fontSize: '1.5rem', textAlign: 'center' }}
                      onChange={handleChange}
                      displayEmpty
                      renderValue={selected => {
                        if (selected === '' || !selected) {
                          return <ArtIcon />
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
                  </Box>
                  <Button
                    variant='contained'
                    type='submit'
                    sx={{
                      '&:hover': {
                        color: '#00FFED',
                        background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                        boxShadow:
                          '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                      },
                      ...(isMultiline
                        ? {
                            height: '3.2rem',
                            width: '8.8rem',
                            mt: 6,
                            ml: 27,
                            position: 'relative',
                            zIndex: 0,
                            fontSize: 17
                          }
                        : { display: 'none' })
                    }}
                  >
                    Publicar
                    <div style={{ paddingLeft: 6, paddingTop: 14 }}>
                      <Send />
                    </div>
                  </Button>
                </div>
              </form>
            </Box>
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
            <Container sx={{ textAlign: 'center', mt: 62 }} fixed>
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
