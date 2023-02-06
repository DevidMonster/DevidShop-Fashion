//import { createSelector } from '@reduxjs/toolkit';

export const screenModeSelector = (state) => state.mainReducer.active

export const toggleSideBarSelector = (state) => state.mainReducer.toggle_mode

export const prevUrlSelector = (state) => state.mainReducer.prevUrl

export const searchHistorySelector = (state) => state.mainReducer.data

export const setCateGorySelected = (state) => state.mainReducer.cateSelected

export const setFilterSelected = (state) => state.mainReducer.filter

// export const reducerSelector = createSelector(
//     screenModeSelector,
//     toggleSideBarSelector, 
//     prevUrlSelector, 
//     searchHistorySelector, 
//     (active, sideBarActive, url, searchList) => {

//     }

// })