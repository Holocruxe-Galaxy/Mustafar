import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface Notifications {
  _id?: string,
  app?: boolean,
  email: boolean,
  user?: string
}

interface NotificationState {
  data: Notifications[],
}



// ** Fetch Notifications
export const fetchData = createAsyncThunk('notifications/fetchData',
  async () => {
      const token = localStorage.getItem('AuthorizationToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/notifications`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json()
      
      return data
})




// ** Patch Notifications
export const editNotifications = createAsyncThunk('notifications/editNotifications', async (emailEnabled: boolean, { dispatch }: Redux) => {
  const token = localStorage.getItem('AuthorizationToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/notifications`, {
   method: 'PATCH',
   headers: {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ email: emailEnabled })
  });

 if (!response.ok) {
   const error = await response.json();
   throw new Error(error.message);
 }

 dispatch(fetchData())

});


export const notifications = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
  } as NotificationState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})


export default notifications.reducer
