// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import countries from "src/store/apps/countries"
import diary from 'src/store/apps/diary'
import notifications from 'src/store/apps/notifications'
import profile from "src/store/apps/profile"

export const store = configureStore({
  reducer: {
    chat,
    countries,
    diary,
    notifications,
    profile
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
