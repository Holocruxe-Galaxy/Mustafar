import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
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
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

// ** Redux Toolkit
import { deleteDiary, editEntrie } from 'src/store/apps/diary'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Utils
import emotions from 'src/@core/utils/emotions'
import RocketFav from 'src/@core/icons/diary/RocketFav'
import EditIcon from 'src/@core/icons/diary/EditIcon'

//import ArtIcon from 'src/@core/icons/diary/ArtIcon'
import DeleteIcon from 'src/@core/icons/diary/DeleteIcon'
import YesButton from 'src/@core/icons/diary/YesButton'
import NoButton from 'src/@core/icons/diary/NoButton'

import IconEmojiButton from 'src/@core/icons/diary/IconEmojiButton'
import UploadButton from 'src/@core/icons/diary/UploadButton'
import Save from 'src/@core/icons/diary/Save'

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
  }),
  backgroundImage: 'linear-gradient(180deg, #00FFED 0%, #D5AEE2 80%)',
  color: '#010032'
}))

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  width: 1,
  height: 1,
  overflow: 'hidden',
  whiteSpace: 'nowrap'
})

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 130
  }
})

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
    backgroundImage: 'none', // Elimina el gradiente cuando está en "checked" (after)
    backgroundColor: '#010032',
    width: '19px',
    height: '19px',
    margin: '1.7px' // Establece el color sólido cuando está en "checked" (after)
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

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 80,
    right: 22,
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
    '&:focus': {
      outline: 'none'
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
  const [file, setFile] = useState<FormData>()

  const contentRef = useRef<HTMLInputElement>(props.content)

  const favoriteRef = useRef<HTMLElement>(props.favorite)
  const emojiRef = useRef<HTMLSelectElement>(props.emoji)

  const pickerRef = useRef<HTMLDivElement>(null)

  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

    // if (file) {
    //   dispatch(editEntrieWithFile({ ...data, _id: id }))
    // } else {
    //   dispatch(editEntrie({ ...data, _id: id }))
    // }
    if (!file) dispatch(editEntrie({ ...data, _id: id }))

    handleCloseEdit()
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDelete = () => {
    dispatch(deleteDiary(id))
  }

  const handleEmojiSelect = (emoji: string, onChange: (value: string) => void) => {
    if (contentRef.current && isPickerVisible) {
      const cursorPosition = contentRef.current.selectionStart || 0

      const inputValue = contentRef.current.value

      const beforeCursor = inputValue.substring(0, cursorPosition)
      const afterCursor = inputValue.substring(cursorPosition)

      const newValue = beforeCursor + emoji + afterCursor
      contentRef.current.value = newValue

      onChange(newValue)
    }
  }

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const formData = new FormData()
    formData.append('photos', file as unknown as string)
    setFile(formData)
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
    zIndex: 9999,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

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
            <Box component='div' sx={{ height: '4rem', display: 'flex', gap: '1rem' }}>
              {props.emoji && (
                <IconButton className={classes.iconButton} sx={{ pt: 0.5, pl: 5 }}>
                  {props.emoji}
                </IconButton>
              )}
              {props.favorite && (
                <CustomWidthTooltip title='Tu publicación se encuentra dentro de tus favoritos' placement='top' arrow>
                  <label>
                    <RocketFav />
                  </label>
                </CustomWidthTooltip>
              )}

              <Tooltip title='Editar publicación' placement='top'>
                <IconButton onClick={handleOpenEdit} sx={{ mt: 1 }} className={classes.iconButton}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <IconButton onClick={handleOpen} sx={{ mt: 1 }} className={classes.iconButton}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <Modal open={openEdit} onClose={handleCloseEdit} sx={styleModal}>
              <Box sx={styleEdit} component='div'>
                <Typography sx={{ textAlign: 'left', mb: 5, color: '#F836F4' }}>EDITAR</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <Controller
                      name='content'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          focused
                          multiline
                          fullWidth
                          minRows={4}
                          maxRows={4}
                          label='Inserta un texto'
                          onChange={onChange}
                          inputRef={contentRef}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end' sx={{ display: 'flex' }}>
                                {!isPickerVisible ? (
                                  ''
                                ) : (
                                  <Card className={classes.picker} ref={pickerRef}>
                                    <Picker
                                      data={data}
                                      perLine={10}
                                      maxFrequentRows={0}
                                      searchPosition='none'
                                      onEmojiSelect={(emoji: { native: string }) => {
                                        handleEmojiSelect(emoji.native, onChange)
                                      }}
                                    />
                                  </Card>
                                )}
                                <IconButton
                                  onClick={() => setPickerVisible(prevState => !prevState)}
                                  className={classes.iconButton}
                                >
                                  <IconEmojiButton />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        ></TextField>
                      )}
                    />
                    <Box
                      component='div'
                      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      {props.emoji && (
                        <IconButton className={classes.iconButton} sx={{ pr: 5 }}>
                          {props.emoji}
                        </IconButton>
                      )}
                      <Box sx={{ display: 'flex', alignItems: 'center', pt: 1, ml: 1 }} component='div'>
                        <Controller
                          name='favorite'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <CustomSwitch checked={value} onChange={onChange} inputRef={favoriteRef} sx={{ mr: 4 }} />
                          )}
                        />
                        <Button
                          component='label'
                          endIcon={<UploadButton />}
                          className={classes.iconButton}
                          sx={{
                            backgroundColor: 'transparent',
                            borderRadius: '50%',
                            height: '3rem',
                            minWidth: 'auto',
                            mr: 3.2,
                            mt: 1
                          }}
                        >
                          <VisuallyHiddenInput type='file' accept='image/*' onChange={fileSelected} />
                        </Button>
                        <Controller
                          name='emoji'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              id='select'
                              value={value}
                              onChange={onChange}
                              inputRef={emojiRef}
                              sx={{
                                height: '2.5rem',
                                pt: 2
                              }}
                              displayEmpty
                              renderValue={selected => {
                                if (selected === '' || !selected) {
                                  return <EmojiEmotionsIcon />
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
                      </Box>
                    </Box>
                    {props.photos && props.photos.length > 0 && (
                      <Box
                        sx={{
                          maxHeight: '400px',
                          overflowY: 'auto',
                          mt: 5,
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#00FFED #141537',
                          '&::-webkit-scrollbar': {
                            width: '10px'
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#00FFED',
                            borderRadius: '5px'
                          },
                          '&::-webkit-scrollbar-track': {
                            backgroundColor: '#141537'
                          }
                        }}
                        component='div'
                      >
                        {fields.map((field, index) => (
                          <CardContent key={field.id}>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                            <CardMedia
                              component='img'
                              sx={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                              image={props.photos[0]}
                              alt='img'
                            />
                          </CardContent>
                        ))}
                      </Box>
                    )}
                    <Button variant='contained' type='submit' sx={{ width: '10rem', mt: 6, ml: '48rem' }}>
                      <Save />
                      Guardar
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Modal>

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
