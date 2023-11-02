import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }

//** Fetch Users data
export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers',
  async () => {
    const token = localStorage.getItem('AuthorizationToken');

    const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/all`, {
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

interface AdminDataFromServer {
    _id: number,
    role: string,
    status: string,
    email: string,
    plan: string,
    personal: {
        name: string
    }
}

interface AdminData {
    id: number,
    fullName: string,
    email: string,
    status: string,
    role?: string,
    plan?: string,
}

export const admin = createSlice({
    name: 'admin',
    initialState: {
      data: [] as AdminData[]
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            // Maps the data from the back to adjust it for the front 
            const adminData: AdminData[] = action.payload.map((dataFromServer: AdminDataFromServer) => ({
                id: dataFromServer._id,
                fullName: dataFromServer?.personal?.name,
                email: dataFromServer.email,
                status: dataFromServer.status,
                role: dataFromServer.role,
                plan: dataFromServer.plan
            }))
            state.data = adminData;
        })
    }
})

export default admin.reducer
