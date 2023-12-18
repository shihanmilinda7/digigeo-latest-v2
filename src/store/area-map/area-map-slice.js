import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAreaSideNavOpen: false,
  areaCountry: "",
  areaState: "",
};

const areaMapSlice = createSlice({
  name: "AreaMap",
  initialState,
  reducers: {
    setIsAreaSideNavOpen: (state, action) => {
      state.isAreaSideNavOpen = action.payload;
    },
    setAreaCountry: (state, action) => {
      state.areaCountry = action.payload;
    },
    setAreaState: (state, action) => {
      state.areaState = action.payload;
    },
  },
});

export const { setAreaCountry, setAreaState, setIsAreaSideNavOpen } =
  areaMapSlice.actions;

export default areaMapSlice.reducer;
