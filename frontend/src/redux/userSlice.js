import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

// Load user data from localStorage if available
const storedUserData = JSON.parse(localStorage.getItem("userData"));
const initialUserState = storedUserData ? { ...initialState, ...storedUserData } : initialState;

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    loginRedux: (state, action) => {
      const { _id, firstName, lastName, email, image } = action.payload.data;
      const newState = {
        ...state,
        _id,
        firstName,
        lastName,
        email,
        image,
      };
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    },
    logoutRedux: (state, action) => {
      localStorage.removeItem("userData"); // Remove user data from localStorage on logout
      return initialState; // Reset the state to the initial state on logout
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;


