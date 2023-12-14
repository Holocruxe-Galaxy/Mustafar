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

interface changeUsersStatus {
  statusType: string,
  users: string[],
  timeLapse?: string
}

interface userData {
  userId: string
}

const status = ['COMPLETE', 'INACTIVE', 'PENDING', 'BANNED', 'SUSPENDED'] as const;
type StatusType = (typeof status)[number];

interface ProfileData {
  name: string;
  birthdate: string;
  provinceOrState: string;
  country: string;
  phone: string;
  email: string;
  language: string;
  status: StatusType;
  step?: number;
  city?: string;
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
export const fetchUserProfile = createAsyncThunk('admin/fetchUserProfile', async ({ userId }: userData) => {
  const token = localStorage.getItem('AuthorizationToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/data/${userId}`, {
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
  const userData = await response.json()
  return userData
})


// ** Reactivate Profile status
export const reactivateUsers = createAsyncThunk('admin/reactivateUsers', async ({ statusType, users }: changeUsersStatus) => {
  const token = localStorage.getItem('AuthorizationToken');
  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/status-reactivate`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ statusType, users })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  } 
})

// ** Suspend Profile status
export const suspendUsers = createAsyncThunk('admin/suspendUsers', async ({ statusType, users, timeLapse} : changeUsersStatus) => {

})

// ** Ban Profile status
export const banUsers = createAsyncThunk('admin/banUsers', async ({ statusType, users } : changeUsersStatus) => {

  const token = localStorage.getItem('AuthorizationToken');
  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/status-ban`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ statusType, users })
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
      userData: {} as ProfileData,
      userIdProfile: '',
      filteredUsers: [] as AdminData[],
      loading: true,
      complete: true
    },
    reducers: {
      setFilteredUsers: (state, action) => {
        state.filteredUsers = action.payload.slice()
      },
      setUserIdProfile: (state, action) => {
        state.userIdProfile = action.payload;
        console.log("Esto es state.userIdProfile: ", state.userIdProfile)
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
        }),
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.userData = action.payload
        }),
        builder.addCase(banUsers.pending, (state) => {
          state.loading = true
        }),
        builder.addCase(reactivateUsers.fulfilled, (state) => {
          state.complete = true
        })
    }
})

export const { setFilteredUsers, setUserIdProfile } = admin.actions;
export default admin.reducer
