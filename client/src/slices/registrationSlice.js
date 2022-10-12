import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    register: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { register } = registrationSlice.actions;

export default registrationSlice.reducer;
