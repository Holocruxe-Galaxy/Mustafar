// ** Types
// import { ThemeColor } from 'src/@core/layouts/types'
import { Dispatch } from 'redux'

export type ChatStoreType = {
  id: string | null
  chats: ChatsArrType[] | null
  selectedChat: SelectedChatType | null
  messages: ChatType[] /* | null */
}

export type SelectedChatType = null | {
  chat: ChatsObj
}

export type ChatsObj = {
  message: ChatType[]
  id?: string
  //chat: ChatType[] 
}

export type ChatType = {
  message: string
  time: Date | string
  id?: string
  feedback?: MsgFeedbackType
}

 // MESSAGES TYPES ------------------------------------------------ 
export type SendMsgParamsType = {
  messages: string
  chat?: ChatsObj
}

export type MessageType = {
  message: string
  time: string | Date
  id?: string
  //feedback?: MsgFeedbackType
}

export type MessageGroupType = {
  senderId: string
  messages: ChatLogChatType[]
}

export type SendMsgComponentType = {
  dispatch: Dispatch<any>
  store: ChatStoreType
  //sendMsg: (params: SendMsgParamsType) => void
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatLogChatType = {
  msg: string;
  senderId?: string;
  time: Date | string;
  //feedback: MsgFeedbackType
}

export type ChatsArrType = {
  id: number
  messages: ChatsObj
}

// CHATCONTENT COMPONENT ----------------------------------------------
export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  dispatch: Dispatch<any>
  store: ChatStoreType
  //sendMsg: (params: SendMsgParamsType) => void
}


// CHATLOG COMPONENT ----------------------------------------------
export type ChatLogType = {
  hidden: boolean
  data: {
    messages: ChatType[]
  }
}

export type FormattedChatsType = {
  messages: ChatLogChatType[]
  senderId: string
}