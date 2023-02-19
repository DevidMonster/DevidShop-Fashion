//import { createSelector } from '@reduxjs/toolkit';

export const userSelector = (state) => state.mainReducer.user

export const screenModeSelector = (state) => state.mainReducer.active

export const toggleSideBarSelector = (state) => state.mainReducer.toggle_mode

export const prevUrlSelector = (state) => state.mainReducer.prevUrl

export const searchHistorySelector = (state) => state.mainReducer.data

export const setCateGorySelected = (state) => state.mainReducer.cateSelected

export const setFilterSelected = (state) => state.mainReducer.filter

export const toggleModalSelector = (state) => state.mainReducer.openModal

export const noticeSelector = (state) => state.mainReducer.contentNotice

export const willReRender = (state) => state.mainReducer.reRender

export const itemUpload = (state) => state.detailReducer.item

export const quantitySelector = (state) => state.detailReducer.quantity

export const colorSelector = (state) => state.detailReducer.color

export const sizeSelector = (state) => state.detailReducer.size

export const cartsStateSelector = (state) => state.detailReducer.cartsState
// export const reducerSelector = createSelector(
//     screenModeSelector,
//     toggleSideBarSelector, 
//     prevUrlSelector, 
//     searchHistorySelector, 
//     (active, sideBarActive, url, searchList) => {

//     }

// })