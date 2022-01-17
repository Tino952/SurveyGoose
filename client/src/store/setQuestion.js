import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, active: false };

const savedSurvey = createSlice({
  name: "setQuestion",
  initialState: initialState,
  reducers: {
    setQuestion(state, action) {
      let myId = action.payload;
      state.id = myId;
      state.active = true;
    },
    reset(state) {
      state.active = false;
    },
  },
});

export default savedSurvey;
