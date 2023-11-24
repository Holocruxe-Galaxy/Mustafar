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

// ** Redux Toolkit
import { deleteDiary, editEntrie, editEntrieWithFile } from 'src/store/apps/diary'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Utils
import emotions from 'src/@core/utils/emotions'
import RocketFav from 'src/@core/icons/diary/RocketFav'
import EditIcon from 'src/@core/icons/diary/EditIcon'
import DeleteIcon from 'src/@core/icons/diary/DeleteIcon'
import YesButton from 'src/@core/icons/diary/YesButton'
import NoButton from 'src/@core/icons/diary/NoButton'

import IconEmojiButton from 'src/@core/icons/diary/IconEmojiButton'
import UploadButton from 'src/@core/icons/diary/UploadButton'
import Save from 'src/@core/icons/diary/Save'
import EditArtIcon from 'src/@core/icons/diary/ArtIconSelected'
import { handleKeyDownHookForm } from 'src/libs/helpers/handle-key-down'

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
      transition: 'none'
    },
    '&:active': {
      backgroundColor: 'transparent',
      transition: 'none'
    },
    '&:focus': {
      outline: 'none'
    },
    '&.MuiIconButton-label': {
      transition: 'none'
    }
  }
}))

const Entries = ({ id, props }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDeleteImg, setOpenDeleteImg] = useState<boolean>(false)
  const [file, setFile] = useState<FormData>()

  const contentRef = useRef<HTMLInputElement>(props.content)

  const favoriteRef = useRef<HTMLElement>(props.favorite)
  const emojiRef = useRef<HTMLSelectElement>(props.emoji)

  const pickerRef = useRef<HTMLDivElement>(null)

  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const handleOpenDeleteImg = () => setOpenDeleteImg(true)
  const handleCloseDeleteImg = () => setOpenDeleteImg(false)

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

  const { control, handleSubmit } = useForm({
    defaultValues: { content: props.content, emoji: props.emoji, photos: props.photos, favorite: props.favorite }
  })

  const { fields, remove } = useFieldArray({
    control,
    name: 'photos'
  })

  const onSubmit = (data: any) => {
    if (data.content === props.content) delete data.content

    if (data.emoji === undefined || data.emoji === props.emoji) delete data.emoji

    if (data.photos.length) delete data.photos

    if (data.favorite === props.favorite) delete data.favorite

    if (file) {
      dispatch(editEntrieWithFile({ ...data, _id: id, photos: [], file }))
      setFile(undefined)
    }
    if (!file) dispatch(editEntrie({ ...data, _id: id }))

    handleCloseEdit()
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDelete = () => {
    dispatch(deleteDiary(id))
  }

  const handleDeleteImg = (index: any) => {
    remove(index)
    handleCloseDeleteImg()
  }

  const pickerToggleHandler = () => {
    setPickerVisible(prevState => {
      if (!prevState) {
        setFocusAndPositionCursor(contentRef.current, contentRef.current?.selectionStart || 0)
      }

      return !prevState
    })
  }

  const setFocusAndPositionCursor = (inputElement: HTMLInputElement, newCursorPosition?: number) => {
    if (inputElement && !inputElement.contains(document.activeElement)) {
      inputElement.focus()

      if (newCursorPosition !== undefined) {
        setTimeout(() => {
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition)
        }, 10)
      } else {
        inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
      }
    }
  }

  const handleEmojiSelect = (emoji: string, onChange: (value: string) => void) => {
    if (contentRef.current && isPickerVisible) {
      const inputElement = contentRef.current
      const cursorPosition = inputElement.selectionStart || 0
      const inputValue = inputElement.value

      const beforeCursor = inputValue.substring(0, cursorPosition)
      const afterCursor = inputValue.substring(cursorPosition)

      const newValue = beforeCursor + emoji + afterCursor

      inputElement.value = newValue

      onChange(newValue)

      const newCursorPosition = cursorPosition + emoji.length

      setFocusAndPositionCursor(contentRef.current, newCursorPosition)
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
    textAlign: 'center',
    height: '100%'
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
                <Box
                  component='div'
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: ' center', pb: 5 }}
                >
                  <Typography sx={{ color: '#F836F4' }}>EDITAR</Typography>
                  <IconButton onClick={handleCloseEdit}>
                    <ClearIcon />
                  </IconButton>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <Controller
                      name='content'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          onKeyDown={e => handleKeyDownHookForm(e, handleSubmit, onSubmit, contentRef)}
                          focused
                          multiline
                          fullWidth
                          minRows={4}
                          maxRows={4}
                          label='Inserta un texto'
                          onChange={onChange}
                          inputRef={(ref: any) => {
                            setFocusAndPositionCursor(ref)
                            contentRef.current = ref
                          }}
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
                                  onClick={e => {
                                    e.stopPropagation()
                                    pickerToggleHandler()
                                    if (isPickerVisible) {
                                      setFocusAndPositionCursor(
                                        contentRef.current,
                                        contentRef.current?.selectionStart || 0
                                      )
                                    }
                                  }}
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
                      sx={
                        !props.emoji
                          ? { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }
                          : { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
                      }
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
                                fontSize: '1.5rem'
                              }}
                              displayEmpty
                              renderValue={selected => {
                                if (selected === '' || !selected) {
                                  return <EditArtIcon />
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
                          maxHeight: '300px',
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
                        {fields.map(field => (
                          <>
                            <IconButton
                              onClick={() => handleOpenDeleteImg()}
                              sx={{ float: 'right', mr: 2, mb: 2, color: '#00FFED' }}
                            >
                              <ClearIcon />
                            </IconButton>
                            <CardContent key={field.id}>
                              <CardMedia
                                component='img'
                                sx={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  borderRadius: '32px'
                                }}
                                image={props.photos[0]}
                                alt='img'
                              />
                            </CardContent>
                          </>
                        ))}
                      </Box>
                    )}
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{
                        width: '10rem',
                        mt: 6,
                        ml: '48rem',
                        '&:hover': {
                          color: '#00FFED',
                          background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                          boxShadow:
                            '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                        }
                      }}
                    >
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
                  sx={{
                    marginTop: 3,
                    width: '50%',
                    height: '3rem',
                    fontSize: 'large',
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                    <YesButton />
                  </div>
                  Si
                </Button>

                <Button
                  onClick={handleClose}
                  variant='contained'
                  sx={{
                    marginTop: 3,
                    width: '50%',
                    height: '3rem',
                    fontSize: 'large',
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 2, marginRight: 6 }}>
                    <NoButton />
                  </div>
                  No
                </Button>
              </Box>
            </Modal>

            <Modal open={openDeleteImg} onClose={handleCloseDeleteImg}>
              <Box component='div' sx={style}>
                <Typography variant='h6' component='h2'>
                  Eliminar imagen?
                </Typography>
                <Button
                  onClick={handleDeleteImg}
                  variant='contained'
                  sx={{
                    marginTop: 3,
                    width: '50%',
                    height: '3rem',
                    fontSize: 'large',
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                    <YesButton />
                  </div>
                  Si
                </Button>

                <Button
                  onClick={handleCloseDeleteImg}
                  variant='contained'
                  sx={{
                    marginTop: 3,
                    width: '50%',
                    height: '3rem',
                    fontSize: 'large',
                    '&:hover': {
                      color: '#00FFED',
                      background: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 100%)',
                      boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.70), 4px 4px 4px 0px rgba(255, 255, 255, 0.25) inset'
                    }
                  }}
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
            <CardContent sx={{ backgroundImage: 'linear-gradient(180deg, #00FFED 0%, rgba(248, 54, 244, 0.20) 80%)' }}>
              <CardMedia
                component='img'
                height='auto'
                image={props.photos}
                alt='img'
                sx={{
                  borderRadius: '32px'
                }}
              />
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  )
}

export default Entries
