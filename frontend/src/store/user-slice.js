import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { loggedIn: false, username: "" },
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export function setLoggedInThunk(isLoggedIn, username = "") {
  return function (dispatch) {
    dispatch(userSlice.actions.setLoggedIn(isLoggedIn));
    dispatch(userSlice.actions.setUsername(username));
  };
}
