// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isLoggedIn:false,
    bookedSeats:[],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setBookedSeats:(state,action)=>{
      state.bookedSeats = action.payload
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn= false;
      state.bookedSeats=[];
    },
  },
});

export const { setUser, setToken,setIsLoggedIn,setBookedSeats, clearUser } = userSlice.actions;
export default userSlice.reducer;
