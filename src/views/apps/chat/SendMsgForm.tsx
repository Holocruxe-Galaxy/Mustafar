// ** React Imports
import { useState, SyntheticEvent } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box, { BoxProps } from '@mui/material/Box';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Types
import { SendMsgComponentType } from 'src/types/apps/chatTypes';
import { socketClient } from 'src/libs/socket.io';

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: 8,
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper
}));

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}));

const SendMsgForm = (props: SendMsgComponentType) => {
  // ** Props
  const { store, dispatch, sendMsg } = props;

  // ** State
  const [msg, setMsg] = useState<string>('');

  const handleSendMsg = (e: SyntheticEvent) => {
    e.preventDefault();
    if (store && msg.trim().length) {
      dispatch(sendMsg({ ...store.chats, messages: msg }));
      socketClient.sendMessage(msg);
      setMsg('');
    }
  };

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box component='div' sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={msg}
            size='small'
            placeholder='Type your message here…'
            onChange={e => setMsg(e.target.value)}
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
          />
        </Box>
        <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit'>
            <Icon icon='majesticons:send' />
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
