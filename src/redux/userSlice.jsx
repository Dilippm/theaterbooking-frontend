// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isLoggedIn:false,
    bookedSeats:[],
    reservedSeats:[],
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
    setReservedSeats:(state,action)=>{
      state.reservedSeats = action.payload
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn= false;
      state.bookedSeats=[];
      state.reservedSeats =[];
    },
  },
});

export const { setUser, setToken,setIsLoggedIn,setBookedSeats,setReservedSeats, clearUser } = userSlice.actions;
export default userSlice.reducer;
