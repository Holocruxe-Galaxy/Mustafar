// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react';

// ** Store & Actions Imports
import { useSelector } from 'react-redux';

// ** Types
import { RootState, AppDispatch } from 'src/store';

// ** MUI Imports
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar';

// ** Types Imports
import {
  ChatLogType,
  MessageType,
  MsgFeedbackType,
  ChatLogChatType,
  FormattedChatsType,
  MessageGroupType,
} from 'src/types/apps/chatTypes';

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown>; }>(({ theme }) => ({
  padding: theme.spacing(5)
}));

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { data, hidden } = props;

  // ** Ref
  const chatArea = useRef(null);

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        // @ts-ignore
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      } else {
        // @ts-ignore
        chatArea.current._container.scrollTop = chatArea.current._container.scrollHeight;
      }
    }
  };

  const store = useSelector((state: RootState) => state.chat)

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageType[] | [] = [];
    if (store.messages) {
      chatLog = store.messages;
    }

    const formattedChatLog: FormattedChatsType[] = [];
      let chatMessageSenderId = store.id
      
      let msgGroup: MessageGroupType = {
        messages: [],
        senderId: chatMessageSenderId
      };
      
        chatLog.forEach((msg: MessageType, index: number) => {
          if (chatMessageSenderId === msg.id) {
            msgGroup.messages.push({
              time: msg.time,
              msg: msg.message,
              //feedback: msg.feedback
            })
          } 
          if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
        })

    return formattedChatLog;
  };

/*   const renderMsgFeedback = (isSender: boolean, feedback: MsgFeedbackType) => {
    if (isSender) {
      if (feedback.isSent && !feedback.isDelivered) {
        return (
          <Box component='span' sx={{ display: 'inline-flex', '& svg': { mr: 2, color: 'text.secondary' } }}>
            <Icon icon='mdi:check' fontSize='1rem' />
          </Box>
        );
      } else if (feedback.isSent && feedback.isDelivered) {
        return (
          <Box
            component='span'
            sx={{
              display: 'inline-flex',
              '& svg': { mr: 2, color: feedback.isSeen ? 'success.main' : 'text.secondary' }
            }}
          >
            <Icon icon='mdi:check-all' fontSize='1rem' />
          </Box>
        );
      } else {
        return null;
      }
    }
  }; */

  useEffect(() => {
    if (store && store.messages && store.messages.length) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item: FormattedChatsType, index: number) => {
      const isSender = item.senderId

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== formattedChatData().length - 1 ? 9.75 : undefined
          }}
        >

          <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {item.messages.map((chat: ChatLogChatType, index: number, { length }: { length: number }) => {
              const time = new Date(chat.time)

              return (
                <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                  <div>
                    <Typography
                      sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        maxWidth: '100%',
                        width: 'fit-content',
                        fontSize: '0.875rem',
                        wordWrap: 'break-word',
                        p: theme => theme.spacing(3, 4),
                        ml: isSender ? 'auto' : undefined,
                        borderTopLeftRadius: !isSender ? 0 : undefined,
                        borderTopRightRadius: isSender ? 0 : undefined,
                        color: isSender ? 'common.white' : 'text.primary',
                        backgroundColor: isSender ? 'primary.main' : 'background.paper'
                      }}
                    >
                      {chat.msg}
                    </Typography>
                  </div>
                  {index + 1 === length ? (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start'
                      }}
                    >
{/*                       {renderMsgFeedback(isSender, chat.feedback)} */}
{/*                       <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {time
                          ? new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                          : null}
                      </Typography> */}
                    </Box>
                  ) : null}
                </Box>
              )
            })}
          </Box>
        </Box>
      )
    })
  }

  const ScrollWrapper = ({ children }: { children: ReactNode; }) => {
    if (hidden) {
      return (
        <Box component='div' ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Box component='div' sx={{ height: 'calc(100% - 8.4375rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  );
};

export default ChatLog;
