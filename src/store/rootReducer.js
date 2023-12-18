import { combineReducers } from "@reduxjs/toolkit";
import mapSelectorReducer from "./map-selector/map-selector-slice";
import areaMapReducer from "./area-map/area-map-slice";

const rootReducer = combineReducers({
  mapSelectorReducer,
  areaMapReducer,
});

export default rootReducer;
