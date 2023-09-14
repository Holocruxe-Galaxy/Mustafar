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

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 60,
    zIndex: 9999
  },
  iconButton: {
    width: '3rem',
    '&:hover': {
      backgroundColor: 'transparent',
      transition: 'none' // Set the background color to transparent on hover
    },
    '&:active': {
      backgroundColor: 'transparent',
      transition: 'none' // Set the background color to transparent when active (clicked)
    },
    '&.MuiIconButton-label': {
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
                    {props.emoji && <IconButton className={classes.iconButton}>{props.emoji}</IconButton>}
                    <div
                      style={{ display: 'flex', flexDirection: 'row', position: 'absolute', right: 5, top: '8.2rem' }}
                    >
                      <Controller
                        name='favorite'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <MaterialUISwitch checked={value} onChange={onChange} inputRef={favoriteRef} />
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
                    </div>
                    {props.photos && props.photos.length > 0 && (
                      <>
                        {fields.map((field, index) => (
                          <CardContent key={field.id}>
                            <CardMedia component='img' height='500' image={props.photos[0]} alt='img' />
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </CardContent>
                        ))}
                      </>
                    )}
                    <Button type='submit'>Guardar</Button>
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
