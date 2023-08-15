// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chat/SendMsgForm'
// import UserProfileRight from 'src/views/apps/chat/UserProfileRight'
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import OptionsMenu from 'src/@core/components/option-menu'

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypes'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    hidden,
    mdAbove,
    selectChat,
    sendMsg,
    store,
    dispatch,
    // statusObj,
    // getInitials,
    // sidebarWidth,
    // userProfileRightOpen,
    // handleLeftSidebarToggle,
    // handleUserProfileRightSidebarToggle
  } = props

  // ** States
  const [active, setActive] = useState(false)


  const handleStartConversation = (type: 'chat') => {
    dispatch(selectChat)
    setActive(true)
    //if (!mdAbove) {
    //  handleLeftSidebarToggle()
    //}
  } 

  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat
      if (active === false) {

        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <IconButton 
            sx={{display: 'flex', flexDirection: 'column', height: 300, width: 300}}
              onClick={() => handleStartConversation('chat')}
            >

            <MuiAvatar
              sx={{
                mb: 5,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                boxShadow: 3,
                '& svg': { color: 'action.active' },
                backgroundColor: 'background.paper'
              }}
            >
              <Icon icon='mdi:message-outline' fontSize='3.125rem' />
            </MuiAvatar>
            <Box
              component='div'
              sx={{
                px: 6,
                py: 2.25,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                cursor: mdAbove ? 'default' : 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Start Conversation</Typography>
            </Box>
            </IconButton>
          </ChatWrapperStartChat>
        )
      } else {
        return (
          <Box
            component='div'
            sx={{
              width: 0,
              flexGrow: 1,
              height: '100%',
              backgroundColor: 'action.hover'
            }}
          >
            {selectedChat ? (
              <ChatLog hidden={hidden} data={{ ...selectedChat }} />
            ) : <Box component='div' sx={{height: 460}}></Box> }

            <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} />
          </Box>
        )
      }
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
