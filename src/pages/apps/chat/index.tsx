// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux';

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
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));
  
  //const smAbove = useMediaQuery(theme.breakpoints.up('sm'));

  //const sidebarWidth = smAbove ? 370 : 300

  return (
    <Box
      component='div'
      className='app-chat'
      sx={{
        width: '100%',
        height: '27rem' /* '100%' */,
        display: 'flex',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: '4px 4px 4px 0px rgba(255, 255, 255, 0.50)',
        ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
        /*         boxShadow: skin === 'bordered' ? 0 : 6, */
      }}
    >
      <ChatContent
        hidden={hidden}
        mdAbove={mdAbove}
        store={store}
        dispatch={dispatch}
      />
    </Box>
  );
};

AppChat.contentHeightFixed = false;

export default AppChat;
