import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

// ** MUI Imports
import {
  Container,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Switch from '@mui/material/Switch'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Cloudinary
import { Cloudinary } from 'src/@core/utils/cloudinary'

// ** Redux
import { addDiary } from 'src/store/apps/diary'

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 60,
    zIndex: 9999
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
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
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
  id: string
  content: string
  favorite: boolean
  emoji?: string
  photo?: string
}

export type PostDiary = Omit<Diary, 'id' | 'favorite'>

const Diary = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)
  const [emotion, setEmotion] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const emojiMartRef = useRef<HTMLButtonElement | null>(null)

  const [diary, setDiary] = useState<PostDiary>({ content: 'Hola', emoji: 'Tristeza', photo: 'photo.png' })

  // useEffect(() => {
  //   console.log('diary console.log', diary)
  // }, [diary])

  useEffect(() => {
    /* Handler del emoji picker */
    const handleDocumentClick = (event: any) => {
      if (emojiMartRef.current && !emojiMartRef.current.contains(event.target)) {
        setPickerVisible(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const handleChange = (e: SelectChangeEvent<string>) => {
    setEmotion(e.target.value)
  }
  const handleSwitchChange = () => {
    setChecked(!checked)
  }

  const handleEmojiSelect = (emoji: any) => {
    if (inputRef.current) {
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)

      const emojiNode = document.createTextNode(emoji.native)

      if (range) {
        range.insertNode(emojiNode)
        range.collapse(false)
      }

      // inputRef.current.value += emoji.native
    }
    setPickerVisible(isPickerVisible)
  }

  const onClick = () => {
    console.log('onSubmit')
    dispatch(addDiary(diary))
  }

  const classes = useStyles()

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: 1
        }}
      >
        <Container
          sx={{
            margin: 4,
            width: '100%',
            height: '10%',
            borderRadius: 1,
            display: 'flex'
          }}
        >
          <TextField
            fullWidth
            label='Qué hay de nuevo? ...'
            variant='outlined'
            inputRef={inputRef}
            sx={{ marginTop: 4, marginLeft: 3, borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {!isPickerVisible ? (
                    ''
                  ) : (
                    <Card className={classes.picker}>
                      <Picker
                        ref={emojiMartRef}
                        data={data}
                        emojiTooltip
                        perLine={10}
                        searchPosition='none'
                        onEmojiSelect={handleEmojiSelect}
                      />
                    </Card>
                  )}
                  <IconButton onClick={() => setPickerVisible(!isPickerVisible)} sx={{ marginRight: 1 }}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <MaterialUISwitch sx={{ marginRight: 2 }} onChange={handleSwitchChange} />

                  <Cloudinary values={diary} setValues={setDiary} />
                  <Button variant='contained' onClick={onClick}>
                    Enviar <RocketLaunchIcon sx={{ paddingLeft: 1 }} />
                  </Button>
                </InputAdornment>
              )
            }}
          ></TextField>
          <Select
            id='select'
            sx={{ width: '13%', height: '73%', marginTop: 4, marginLeft: 2 }}
            value={emotion}
            onChange={handleChange}
            displayEmpty
            renderValue={selected => {
              if (selected === 'none' || selected.length === 0) {
                return <EmojiEmotionsIcon sx={{ paddingLeft: 9, paddingTop: 1 }} />
              }

              return selected
            }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value=''>
              <em>Añadir una emoción</em>
            </MenuItem>
            <MenuItem value={'none'}>Ninguna</MenuItem>
            <MenuItem value={'Tristeza'}>😔 Tristeza</MenuItem>
            <MenuItem value={'Miedo'}>😰 Miedo</MenuItem>
            <MenuItem value={'Ira'}>🤬 Ira</MenuItem>
            <MenuItem value={'Felicidad'}>😁 Felicidad</MenuItem>
            <MenuItem value={'Enamoramiento'}>🥰 Enamoramiento</MenuItem>
            <MenuItem value={'Sorpresa'}>😱 Sorpresa</MenuItem>
            <MenuItem value={'Asco'}>🤢 Asco</MenuItem>
            <MenuItem value={'Verguenza'}>😰 Verguenza</MenuItem>
            <MenuItem value={'Culpa'}>😖 Culpa</MenuItem>
            <MenuItem value={'Gratitud'}>🤗 Gratitud</MenuItem>
            <MenuItem value={'Esperanza'}>😊 Esperanza</MenuItem>
            <MenuItem value={'Confianza'}>😎 Confianza</MenuItem>
            <MenuItem value={'Admiración'}>🤩 Admiración</MenuItem>
            <MenuItem value={'Satisfación'}>😄 Satisfación</MenuItem>
            <MenuItem value={'Desprecio'}>😒 Desprecio</MenuItem>
            <MenuItem value={'Ansiedad'}>😖 Ansiedad</MenuItem>
            <MenuItem value={'Soledad'}>🥺 Soledad</MenuItem>
            <MenuItem value={'Arrepentimiento'}>😕 Arrepentimiento</MenuItem>
            <MenuItem value={'Frustración'}>😤 Frustración</MenuItem>
            <MenuItem value={'Euforia'}>🥳 Euforia</MenuItem>
            <MenuItem value={'Agradecimiento'}>🙏 Agradecimiento</MenuItem>
            <MenuItem value={'Diversión'}>😜 Diversión</MenuItem>
            <MenuItem value={'Alivio'}>😌 Alivio</MenuItem>
            <MenuItem value={'Hostilidad'}>😠 Hostilidad</MenuItem>
            <MenuItem value={'Hostilidad'}>🥵 Desesperación</MenuItem>
            <MenuItem value={'Impotencia'}>😣 Impotencia</MenuItem>
            <MenuItem value={'Apatía'}>😶 Apatía</MenuItem>
            <MenuItem value={'Amor'}>😍 Amor</MenuItem>
          </Select>
        </Container>
      </Card>
    </>
  )
}

export default Diary
