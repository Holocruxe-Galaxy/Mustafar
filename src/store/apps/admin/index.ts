import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Redux {
    getState: any
    dispatch: Dispatch<any>
  }

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
    id: string,
    fullName: string,
    email: string,
    status: string,
    role?: string,
    plan?: string,
}

interface userStatus {
  type: string,
  users: string
}

interface userData {
  userEmail: string
}

//** Fetch All Users data
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

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('admin/fetchUserProfile', async ({ userEmail }: userData) => {
  const token = localStorage.getItem('AuthorizationToken');
  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/data/email`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ userEmail })
});
console.log("Esto es response en fetchUserProfile: ", response)
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
} 
})

// ** Patch Profile status
export const updateStatus = createAsyncThunk('admin/updateStatus', async ({ type, users }: userStatus) => {
  const token = localStorage.getItem('AuthorizationToken');
  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/data`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ type, users })
});
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  } 
})

export const admin = createSlice({
    name: 'admin',
    initialState: {
      data: [] as AdminData[],
      filteredUsers: [] as AdminData[]
    },
    reducers: {
      setFilteredUsers: (state, action) => {
        state.filteredUsers = action.payload.slice()
      }
    },
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

export const { setFilteredUsers } = admin.actions;
export default admin.reducer
