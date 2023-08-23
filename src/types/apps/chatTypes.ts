// ** Types
import { Dispatch } from 'redux'

export type ChatsObj = {
  chat: ChatType[]
  lastMessage?: ChatType
  senderId: string 
}

export type ChatType = {
  message: string,
  time: Date | string,
  feedback: MsgFeedbackType,
  senderId: string 
//id: string
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
  }
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string
}

export type MessageType = {
  time: string | Date
  message: string
  feedback: MsgFeedbackType
  senderId: string 
  //id: string
}


export type ChatLogChatType = {
  msg: string
  time: string | Date
  feedback: MsgFeedbackType
}

export type FormattedChatsType = {
  messages: ChatLogChatType[]
  senderId: string 
  //id: string
}

 export type MessageGroupType = {
   senderId: string 
   messages: ChatLogChatType[]
   //id: string
 }

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
  selectChat: (id: string) => void
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatsArrType = {
  chat: ChatsObj
}

export type SelectedChatType = null | {
  chat: ChatsObj
}

export type ChatStoreType = {
  chats: ChatsObj | null /* -----> chatType */
  selectedChat: SelectedChatType
}

// MATERIALIZE ORIGINAL TYPES ----------------------------------------------------------

/* 
// ** Types
import { Dispatch } from 'redux'
import { ThemeColor } from 'src/@core/layouts/types'

export type StatusType = 'busy' | 'away' | 'online' | 'offline'

export type StatusObjType = {
  busy: ThemeColor
  away: ThemeColor
  online: ThemeColor
  offline: ThemeColor
}

export type ProfileUserType = {
  id: number
  role: string
  about: string
  avatar: string
  fullName: string
  status: StatusType
  settings: {
    isNotificationsOn: boolean
    isTwoStepAuthVerificationEnabled: boolean
  }
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  senderId: number
  time: Date | string
  feedback: MsgFeedbackType
  senderId: string

  //id: string
}

export type ChatsObj = {
  chat: ChatType[]
  lastMessage?: ChatType
  senderId: string

  /* 
    id: number
  userId: number
  chat: ChatType[]
  unseenMsgs: number
  lastMessage?: ChatType
}

export type ContactType = {
  id: number
  role: string
  about: string
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
}

export type ChatsArrType = {
  id: number
  role: string
  about: string
  chat: ChatsObj
<<<<<<< HEAD
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
=======

  //id: number
  // role: string
  // about: string
  // avatar?: string
  // fullName: string
  // status: StatusType
  // avatarColor?: ThemeColor
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type SelectedChatType = null | {
  chat: ChatsObj
<<<<<<< HEAD
  contact: ChatsArrType
=======

  // contact: ChatsArrType
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  contacts: ContactType[] | null
  userProfile: ProfileUserType | null
  selectedChat: SelectedChatType
<<<<<<< HEAD
=======

  //contacts: ContactType[] | null
  //userProfile: ProfileUserType | null
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string
<<<<<<< HEAD
  contact?: ChatsArrType
=======

  // contact?: ChatsArrType
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  sendMsg: (params: SendMsgParamsType) => void
<<<<<<< HEAD
  handleUserProfileRightSidebarToggle: () => void
=======

  // sidebarWidth: number
  // statusObj: StatusObjType
  // userProfileRightOpen: boolean
  // handleLeftSidebarToggle: () => void
  // getInitials: (val: string) => string
  // handleUserProfileRightSidebarToggle: () => void
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type ChatSidebarLeftType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  removeSelectedChat: () => void
  selectChat: (id: number) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
}

export type UserProfileLeftType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
}

export type UserProfileRightType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  getInitials: (val: string) => string
  handleUserProfileRightSidebarToggle: () => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
<<<<<<< HEAD
    contact: ContactType
    userContact: ProfileUserType
=======

    //contact: ContactType
    //userContact: ProfileUserType
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
  }
}

export type MessageType = {
  time: string | Date
  message: string
  senderId: number
  feedback: MsgFeedbackType
<<<<<<< HEAD
=======
  senderId: string

  //id: string
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
}

export type ChatLogChatType = {
  msg: string
  time: string | Date
  feedback: MsgFeedbackType
}

export type FormattedChatsType = {
  senderId: number
  messages: ChatLogChatType[]
<<<<<<< HEAD
}

export type MessageGroupType = {
  senderId: number
  messages: ChatLogChatType[]
}
*/
=======
  senderId: string

  //id: string
}

 export type MessageGroupType = {
   senderId: string
   messages: ChatLogChatType[]

   //id: string
 }
>>>>>>> 11c3affefe288c96083292ce30bf4ad522c82920
