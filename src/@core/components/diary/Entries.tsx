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
import RocketFav from 'src/@core/icons/diary/RocketFav'
import EditIcon from 'src/@core/icons/diary/EditIcon'
import ArtIcon from 'src/@core/icons/diary/ArtIcon'
import DeleteIcon from 'src/@core/icons/diary/DeleteIcon'
import YesButton from 'src/@core/icons/diary/YesButton'
import NoButton from 'src/@core/icons/diary/NoButton'

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
      width: 24, // Aumentamos el ancho para acomodar el texto "on" y "off"
      height: 16
    },
    '&:before': {
      backgroundColor: theme.palette.primary.main, // Cambiamos la imagen de fondo a un color sólido
      color: theme.palette.primary.contrastText,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      content: 'On'
    },
    '&:after': {
      backgroundColor: theme.palette.primary.main, // Cambiamos la imagen de fondo a un color sólido
      color: theme.palette.primary.contrastText,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      content: 'Off'
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
    <Card sx={{ backgroundColor: 'background.default' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#59c1bd' }}>R</Avatar>}
        action={
          <>
            {props.emoji && <IconButton className={classes.iconButton}>{props.emoji}</IconButton>}
            {props.favorite && (
              <Tooltip title='Tu publicación se encuentra dentro de tus favoritos' placement='top'>
                <IconButton className={classes.iconButton}>
                  <RocketFav />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title='Editar publicación' placement='top'>
              <IconButton className={classes.iconButton} onClick={handleOpenEdit} sx={{ marginTop: 1, marginRight: 2 }}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Modal open={openEdit} onClose={handleCloseEdit} sx={styleModal}>
              <Box sx={styleEdit} component='div'>
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
                                  <IconButton />
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
                          sx={{ position: 'absolute', top: 130 }}
                          displayEmpty
                          renderValue={selected => {
                            if (selected === '' || !selected) {
                              return (
                                <span style={{ position: 'absolute', bottom: 0, right: 50 }}>
                                  <ArtIcon />
                                </span>
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
              <DeleteIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
              <Box component='div' sx={style}>
                <Typography variant='h6' component='h2'>
                  Deseas eliminar?
                </Typography>
                <Button
                  onClick={handleDelete}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', height: '3rem', fontSize: 'large' }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                    <YesButton />
                  </div>
                  Si
                </Button>

                <Button
                  onClick={handleClose}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', height: '3rem', fontSize: 'large' }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 2, marginRight: 6 }}>
                    <NoButton />
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
