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
    selectedConversation: null,
    messages: [],
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
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn= false;
      state.bookedSeats=[];
      state.reservedSeats =[];
      state.messages=[];
      state.selectedConversation= null
    },
  },
});

export const { setUser, setToken,setIsLoggedIn,setBookedSeats,setReservedSeats,setSelectedConversation, setMessages,clearUser } = userSlice.actions;
export default userSlice.reducer;
