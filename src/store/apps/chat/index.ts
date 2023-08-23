// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { Dispatch } from 'redux'
import { SendMsgParamsType } from 'src/types/apps/chatTypes'

import { Manager, Socket } from "socket.io-client";

type setFunction = (val: any) => void
let socket: Socket

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  const response = await axios.get('/apps/chat/users/profile-user')

  return response.data
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts')

  return response.data
})

// ** Select Chat -> busca el chat a partir del ID
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (setId: setFunction) => {
    const manager = new Manager(`${process.env.NEXT_PUBLIC_MANDALORE}/socket.io/socket.io.js`, {
    extraHeaders: {
      authorization: 'holaaaasa'
    }
  });

    socket?.removeAllListeners();
    socket = manager.socket('/');
  
    socket.emit('clientChat', { message: 'hola' });

    socket.on('connection', () => console.log(socket.id));
    console.log("Esto es socket id: ", socket.id)

    return null
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  console.log("Entrando a index.ts sendMsg")
  const response = await axios.post('/apps/chat/send-msg', {
    data: {
      obj
    }
  })

  //await dispatch(fetchChatsContacts())
  console.log("Esto es response.data: ", response.data)
  return response.data
})

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    selectedChat: null
    //contacts: null,
    //userProfile: null,
  },
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.chats = action.payload.chatsContacts
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
  }
})

export const { removeSelectedChat } = appChatSlice.actions

export default appChatSlice.reducer
