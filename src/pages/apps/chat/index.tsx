// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToChat } from 'src/store/apps/chat';

// ** Types
import { RootState, AppDispatch } from 'src/store';


// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings';

// ** Chat App Components Imports
import ChatContent from 'src/views/apps/chat/ChatContent';

const AppChat = () => {

  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const dispatch = useDispatch<AppDispatch>();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state: RootState) => state.chat);

  // ** Vars
  const { skin } = settings;
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));

  //const sidebarWidth = smAbove ? 370 : 300

  return (
    <Box
      component='div'
      className='app-chat'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
      }}
    >
      <ChatContent
        hidden={hidden}
        mdAbove={mdAbove}
        store={store}
        dispatch={dispatch}
        //sendMsg={addMessageToChat}
      />
    </Box>
  );
};

AppChat.contentHeightFixed = false;

export default AppChat;
