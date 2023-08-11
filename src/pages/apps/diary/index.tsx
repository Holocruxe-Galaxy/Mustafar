import { useState } from 'react'

// ** MUI Imports
import { TextField, Button, Typography } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

// ** import CardContent from '@mui/material/CardContent'

import Card from '@mui/material/Card'

// ** Emoji Picker Import
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Diary = () => {
  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  console.log(selectedEmoji)

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji)
    setPickerVisible(isPickerVisible)
  }

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
        <Card
          sx={{
            margin: 4,
            width: '100%',
            height: '10%',
            borderRadius: 1,
            display: 'flex'
          }}
        >
          <Card
            sx={{
              margin: 3,
              width: '99%',
              height: '80%',
              borderRadius: 1,
              display: 'flex'
            }}
          >
            <TextField
              label='Qué hay de nuevo? ...'
              variant='outlined'
              sx={{ marginTop: 4, marginLeft: 3, width: '70%', height: '80%', borderRadius: 2 }}
            ></TextField>
          </Card>
        </Card>

        <Button onClick={() => setPickerVisible(!isPickerVisible)} sx={{ position: 'relative' }}>
          <EmojiEmotionsIcon />
        </Button>
        {!isPickerVisible ? '' : <Picker data={data} emojiTooltip perLine={8} searchPosition='none' />}
      </Card>
    </>
  )
}

export default Diary
