// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
//import Badge from '@mui/material/Badge';
import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box, { BoxProps } from '@mui/material/Box';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Import
import ChatLog from './ChatLog';
import SendMsgForm from 'src/views/apps/chat/SendMsgForm';

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypes';
import { saveId } from 'src/store/apps/chat';
import { socketClient } from 'src/libs/socket.io';

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
}));

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    hidden,
    mdAbove,
    store,
    dispatch,
  } = props;

  // ** States
  const [active, setActive] = useState(false);

  const [id, setId] = useState('');

  useEffect(() => {
    if (id) dispatch(saveId(id));
    socketClient.recieveMessages(dispatch);
    socketClient.recieveBroadcast(dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const handleStartConversation = () => {
    socketClient.connect(setId);
    setActive(true);
  };

  const renderContent = () => {
    if (store) {
      const messages = store.messages
      
      if (active === false) {

        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <IconButton
              sx={{ display: 'flex', flexDirection: 'column', height: 300, width: 300 }}
              onClick={() => handleStartConversation()}
            >

              <MuiAvatar
                sx={{
                  mb: 5,
                  pt: 8,
                  pb: 7,
                  px: 7.5,
                  width: 110,
                  height: 100,
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
                <Typography sx={{ fontWeight: 600 }}>Iniciar Conversación</Typography>
              </Box>
            </IconButton>
          </ChatWrapperStartChat>
        );
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

            <Box
            component='div'
            sx={{
              py: 3,
              px: 5,
              mb: 3,
              height: "11%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
            ></Box>

            { store.messages ? (
              <ChatLog hidden={hidden} data={{messages: messages}} />
            ) : null }

            <SendMsgForm store={store} dispatch={dispatch} />
          </Box>
        );
      }
    } else {
      return null;
    }
  };

  return renderContent();
};

export default ChatContent;
