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
                  <Android12Switch sx={{ marginRight: 3 }} onClick={handleSwitchChange} checked={diary.favorite} />
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
