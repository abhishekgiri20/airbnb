import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {} as any,
  reducers: {
    setData(state, action) {
      state.intialState = action.payload;
      console.log(action.payload,"payload");
    },
    updateProfile: (state, action) => {
      state.intialState = { ...state.intialState, ...action.payload };
      console.log("update data",action.payload)
    },
  },
});

export const { setData,updateProfile } = userSlice.actions;
export default userSlice.reducer;
