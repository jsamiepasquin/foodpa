import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: "",
  data: {
    height: 0,
    weight: 0,
    waistCircumference: 0,
    hipCircumference: 0,
    bodyTemperature: 0,
    bloodPressure: "",
    heartRate: "",
    bloodSugar: "dL",
    cholesterolLevels: "",
    firstName: "",    // Initialize with empty strings or default values
    lastName: "",
    birthday: "",
    gender: "",
    email:""
  }
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },

    setUser: (state, action) => {
      const { auth, data } = action.payload;
      state.auth = auth !== undefined ? auth : state.auth;
      state.data = {
        ...state.data,
        ...data
      };
    },
    resetUser: () => initialState
  }
});

export const {
  setAuth,
  resetUser,
  setUser
} = userSlice.actions;

export default userSlice.reducer;
