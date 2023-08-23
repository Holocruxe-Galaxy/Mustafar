// ** React Imports
import { useRef, useEffect, Ref, ReactNode } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar';

// ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
// import { getInitials } from 'src/@core/utils/get-initials'

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

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageType[] | [] = [];

    if (data.chat) {
      chatLog = data.chat.chat;
    }
    console.log("Esto es data.chat en ChatLog: ", data.chat);
    const formattedChatLog: FormattedChatsType[] = [];
    const chatMessageSenderId = /* chatLog[0] ? */ chatLog[0].senderId; /* : null */
    let msgGroup: MessageGroupType = {
      messages: [],
      senderId: chatMessageSenderId
    };
    chatLog.forEach((msg: MessageType, index: number) => {
      //if (chatMessageSenderId === msg.senderId) {
      msgGroup.messages.push({
        time: msg.time,
        msg: msg.message,
        feedback: msg.feedback
      });

      //} else {
      //  chatMessageSenderId = msg.senderId

      formattedChatLog.push(msgGroup);
      msgGroup = {
        senderId: msg.senderId,
        messages: [
          {
            time: msg.time,
            msg: msg.message,
            feedback: msg.feedback
          }
        ]
      };

      //}

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });

    return formattedChatLog;
  };

  const renderMsgFeedback = (isSender: boolean, feedback: MsgFeedbackType) => {
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
  };

  useEffect(() => {
    if (data && data.chat && data.chat.chat.length) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item: FormattedChatsType, index: number) => {
      const isSender = item.senderId;

      return (
        <Box
          component='div'
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== formattedChatData().length - 1 ? 9.75 : undefined
          }}
        >
          <div>
            {/*             <CustomAvatar
              skin='light'
              color={data.contact.avatarColor ? data.contact.avatarColor : undefined}
              sx={{
                width: '2rem',
                height: '2rem',
                fontSize: '0.875rem',
                ml: isSender ? 4 : undefined,
                mr: !isSender ? 4 : undefined
              }}
              {...(data.contact.avatar && !isSender
                ? {
                    src: data.contact.avatar,
                    alt: data.contact.fullName
                  }
                : {})}
              {...(isSender
                ? {
                    src: data.userContact.avatar,
                    alt: data.userContact.fullName
                  }
                : {})}
            > 
              {data.contact.avatarColor ? getInitials(data.contact.fullName) : null}
            </CustomAvatar>*/}
          </div>

          <Box component='div' className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {item.messages.map((chat: ChatLogChatType, index: number, { length }: { length: number; }) => {
              const time = new Date(chat.time);

              return (
                <Box component='div' key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
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
                      component='div'
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {renderMsgFeedback(isSender, chat.feedback)}
                      <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {time
                          ? new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                          : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

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
