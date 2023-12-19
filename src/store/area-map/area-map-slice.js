import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAreaSideNavOpen: false,
  areaCountry: "",
  areaMiningArea: "",
  syncPropertyFeatures: undefined,
  areaZoomMode: "custom",
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
    setAreaMiningArea: (state, action) => {
      state.areaMiningArea = action.payload;
    },
    setSyncPropertyFeatures: (state, action) => {
      state.syncPropertyFeatures = action.payload;
    },
    setAreaZoomMode: (state, action) => {
      state.areaZoomMode = action.payload;
    },
  },
});

export const {
  setAreaCountry,
  setAreaMiningArea,
  setIsAreaSideNavOpen,
  setSyncPropertyFeatures,
  setAreaZoomMode,
} = areaMapSlice.actions;

export default areaMapSlice.reducer;
