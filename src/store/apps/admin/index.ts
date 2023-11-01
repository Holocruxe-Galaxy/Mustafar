import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }
  
interface AdminData {
    role: string,
    id: number,
    name: string,
    email: string,
    plan: string,
    status: string,
}

export const admin = createSlice({
    name: 'admin',
    initialState: {
        data: {} as AdminData,
    },
    reducers: {},
})

export default admin.reducer