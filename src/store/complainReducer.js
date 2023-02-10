import { createSlice } from "@reduxjs/toolkit";

export const complainsSlice = createSlice({
  name: "complains",
  initialState: {
    complains: [],
    currentComplain: {},
    Totalcomplains: 0,
  },
  reducers: {
    setComplains: (state, action) => {
      state.complains = action.payload;
    },
    setCurrentComplain: (state, action) => {
      state.currentComplain = action.payload;
    },
    // assignLawyerToComplain: (state, action) => {
    //   state.currentComplain = action.payload;
    // },
    // assignAgentToComplain: (state, action) => {
    //   state.currentComplain = action.payload;
    // },
    // setTotalcomplains: (state, action) => {
    //   state.Totalcomplains = action.payload;
    // },
  },
});

export const {
  setcomplains,
  setCurrentComplain,
  //   assignLawyerToComplain,
  //   assignAgentToComplain,
  //   setTotalcomplains,
} = complainsSlice.actions;

export const selectcomplains = (state) => state.complains;
export const selectCurrentComplain = (state) => state.complains.currentComplain;
// export const selectTotalcomplains = (state) => state.complains.Totalcomplains;

export default complainsSlice.reducer;
