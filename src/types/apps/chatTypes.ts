// ** Types
// import { ThemeColor } from 'src/@core/layouts/types'
import { Dispatch } from 'redux'

// export type StatusType = 'busy' | 'away' | 'online' | 'offline'

// export type StatusObjType = {
//   busy: ThemeColor
//   away: ThemeColor
//   online: ThemeColor
//   offline: ThemeColor
// }

//export type ProfileUserType = {
  //id: number
  // role: string
  // about: string
  // avatar: string
  // fullName: string
  // status: StatusType
  // settings: {
  //   isNotificationsOn: boolean
  //   isTwoStepAuthVerificationEnabled: boolean
  // }
//}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  time: Date | string
  feedback: MsgFeedbackType
  senderId: string
  //id: string
}

export type ChatsObj = {
  chat: ChatType[]
  lastMessage?: ChatType
  //userId: number
  // unseenMsgs: number
}

//export type ContactType = {
  //id: number
  //role: string
  //about: string
  //avatar?: string
  //fullName: string
  //status: StatusType
  //avatarColor?: ThemeColor
//}

export type ChatsArrType = {
  chat: ChatsObj
  //id: number
  // role: string
  // about: string
  // avatar?: string
  // fullName: string
  // status: StatusType
  // avatarColor?: ThemeColor
}

export type SelectedChatType = null | {
  chat: ChatsObj
  // contact: ChatsArrType
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  selectedChat: SelectedChatType
  //contacts: ContactType[] | null
  //userProfile: ProfileUserType | null
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string
  // contact?: ChatsArrType
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
  selectChat: (id: number) => void
  // sidebarWidth: number
  // statusObj: StatusObjType
  // userProfileRightOpen: boolean
  // handleLeftSidebarToggle: () => void
  // getInitials: (val: string) => string
  // handleUserProfileRightSidebarToggle: () => void
}

// export type ChatSidebarLeftType = {
//   hidden: boolean
//   mdAbove: boolean
//   store: ChatStoreType
//   sidebarWidth: number
//   userStatus: StatusType
//   dispatch: Dispatch<any>
//   leftSidebarOpen: boolean
//   statusObj: StatusObjType
//   userProfileLeftOpen: boolean
//   removeSelectedChat: () => void
//   selectChat: (id: number) => void
//   handleLeftSidebarToggle: () => void
//   getInitials: (val: string) => string
//   setUserStatus: (status: StatusType) => void
//   handleUserProfileLeftSidebarToggle: () => void
//   formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
// }

//export type UserProfileLeftType = {
//  hidden: boolean
//  store: ChatStoreType
//  sidebarWidth: number
//  userStatus: StatusType
//  statusObj: StatusObjType
// userProfileLeftOpen: boolean
//  setUserStatus: (status: StatusType) => void
//  handleUserProfileLeftSidebarToggle: () => void
//}

// export type UserProfileRightType = {
//   hidden: boolean
//   store: ChatStoreType
//   sidebarWidth: number
//   statusObj: StatusObjType
//   userProfileRightOpen: boolean
//   getInitials: (val: string) => string
//   handleUserProfileRightSidebarToggle: () => void
// }

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
    //contact: ContactType
    //userContact: ProfileUserType
  }
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
