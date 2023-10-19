import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface Location {
  country?: string
  provinceOrState?: string
  city?: string
  language?: string
}

interface Personal {
  name?: string,
  birthdate?: null
}

interface ContactInfo {
  phone?: string
}


interface Profile {
  contactInfo?: ContactInfo;
  location?: Location;
  personal?: Personal;
}

interface ProfilePatchData {
  profileData: Profile;
}



const status = ['COMPLETE', 'INACTIVE', 'PENDING', 'BANNED'] as const;
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

// ** Fetch Profile data
export const fetchData = createAsyncThunk('profile/fetchData',
  async () => {
      const token = localStorage.getItem('AuthorizationToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/data`, {
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
      console.log("🚀 ~ file: index.ts:40 ~ data:", data)

      return data
})

// ** Patch Profile data
export const editProfileData = createAsyncThunk('profile/editProfile', async (data: ProfilePatchData, { dispatch }: Redux) => {
  const token = localStorage.getItem('AuthorizationToken');
  const response = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/form/step`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
  });
  console.log("🚀 ~ file: index.ts:87 ~ editProfileData ~ data:", data)

 if (!response.ok) {
   const error = await response.json();
   throw new Error(error.message);
 }

 dispatch(fetchData())

});

export const profile = createSlice({
  name: 'profile',
  initialState: {
    data: {} as ProfileData,
  } ,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})


export default profile.reducer
