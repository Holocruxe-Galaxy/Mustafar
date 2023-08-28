// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Diary, { PostDiary } from 'src/pages/apps/diary'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface EntryState {
    data: Diary[],
    total: number,
    params: string[],
    allData: Diary[]
}

// ** Fetch Entries
export const fetchData = createAsyncThunk('appDiary/fetchData',
  async () => {
      const token = localStorage.getItem('AuthorizationToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/logbook/diary`, {
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
      const diaryData = await response.json()

      const dispatchableData = {
        allData: diaryData,
        diary: diaryData,
      }

      return dispatchableData
})

// ** Add Entry
export const addDiary = createAsyncThunk(
  'appDiary/addDiary',
  async (data: PostDiary, { dispatch }: Redux) => {
      const token = localStorage.getItem('AuthorizationToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/logbook/diary`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response)
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      dispatch(fetchData())
  }
)

// ** Patch Entry
export const editEntrie = createAsyncThunk('appDiary/editDiary', async ({_id, ...changes} : Diary , { dispatch }: Redux) => {
   const token = localStorage.getItem('AuthorizationToken');

   const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/logbook/diary/${_id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changes)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  dispatch(fetchData())

});

// ** Delete Entry
export const deleteDiary = createAsyncThunk(
   'appDiary/deleteDiary',
   async (id: number | string, { dispatch }: Redux) => {
    const token = localStorage.getItem('AuthorizationToken');

    const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/logbook/diary/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },

    });
    console.log(response)
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    dispatch(fetchData())
  }
)

export const appDiarySlice = createSlice({
  name: 'appDiary',
  initialState: {
    data: [],
    total: 1,
    params: [],
    allData: []
  } as EntryState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.diary

      // state.total = action.payload.total
      // state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appDiarySlice.reducer
