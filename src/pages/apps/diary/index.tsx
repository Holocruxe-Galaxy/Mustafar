import { useState, useRef, useEffect, FormEvent } from 'react'
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
import { Cloudinary } from 'src/@core/utils/cloudinary'

// ** Components
import Entries from 'src/@core/components/diary/Entries'

// ** Redux
import { addDiary, fetchData } from 'src/store/apps/diary'

// ** Utils
import emotions from 'src/@core/utils/emotions'

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 60,
    zIndex: 9999
  }
}))

// TODO: Poner SVG correspondientes para el switch
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
        backgroundImage: `url()`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#59C1BD' : '#59C1BD',
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
      backgroundImage: `url()`
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

export type PostDiary = Omit<Diary, '_id' | 'createdAt' | 'updatedAt'>

const Diary = () => {
  const { data: diaryData } = useSelector((state: RootState) => state.diary)
  const dispatch = useDispatch<AppDispatch>()
  const [inputValue, setInputValue] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)
  const [toSend, setToSend] = useState<boolean>(false)
  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const [diary, setDiary] = useState<PostDiary>({ content: '', favorite: false })

  useEffect(() => {
    dispatch(fetchData())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (diary.content.length) {
      dispatch(addDiary(diary))
      setDiary({ content: '', favorite: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toSend])

  const handleChange = (e: SelectChangeEvent<string>) => {
    setDiary({ ...diary, emoji: e.target.value })
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
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

    // TODO: Checkear poder eliminar el emoji si es lo primero que la persona escribe.
    // TODO: ocultar picker cuando se clickea en otra parte de la pagina.

    setPickerVisible(!isPickerVisible)
  }

  const handleChecked = () => {
    setChecked(!checked)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // TODO: Control de caracteres máximo 200.

    e.preventDefault()
    if (inputRef.current && inputValue.length) {
      setDiary({ ...diary, content: inputRef.current.value })
      setToSend(!toSend)
    }
    setInputValue('')
  }

  const classes = useStyles()

  return (
    <>
      {/* // TODO: Estilar entrada de diario en base a un ternario que verifique si el input esta onFocus() */}
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              id='myInput'
              label='Qué hay de nuevo? ...'
              variant='outlined'
              inputRef={inputRef}
              value={inputRef.current?.value}
              onChange={handleInputChange}
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
                    <IconButton onClick={() => setPickerVisible(!isPickerVisible)} sx={{ marginRight: 2 }}>
                      <EmojiEmotionsIcon />
                    </IconButton>

                    <Tooltip title='Al activarlo, se guardará como tus publicaciones favoritas' placement='top'>
                      <MaterialUISwitch
                        sx={{ marginRight: 3 }}
                        onChange={handleSwitchChange}
                        onClick={handleChecked}
                        checked={checked}
                      />
                    </Tooltip>
                    {/* // TODO: Realizar cambios correspondientes con el S3 de imagenes */}
                    <Cloudinary values={diary} setValues={setDiary} />
                    <Select
                      id='select'
                      variant='standard'
                      sx={{ marginRight: 5 }}
                      value={diary.emoji || ''}
                      onChange={handleChange}
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
                    <Button variant='contained' type='submit'>
                      Enviar <RocketLaunchIcon sx={{ paddingLeft: 1 }} />
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
