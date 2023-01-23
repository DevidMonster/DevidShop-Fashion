// const initState = {
//     active: false,
//     prevUrl: "/",
//     toggle_mode: true,
// }

// const rootReducer = (state = initState, action) => {
//     switch(action.type) {
//         case "SWITCH": 
//             return {
//                 ...state,
//                 active: action.payload
//             }

//         case "SAVE":
//             // lưu URL
//             return {
//                 ...state,
//                 // Thêm thuộc tính URL mới vào state
//                 prevUrl: action.payload,
//             };

//         case "TOGGLE":
//             // localStorage.setItem('mode', toggle)
//             return {
//                 ...state,
//                 toggle_mode: action.payload,
//             };

//         case "DELETE_SEARCH":
//             return {
//                 ...state,
//                 // Thêm thuộc tính URL mới vào state
//                 data: action.payload,
//             };

//         default :
//             return state
            
//     }
// }

// export default rootReducer;

import { createSlice } from '@reduxjs/toolkit';

const reducers = createSlice({
    name: 'globalState',
    initialState: {
        active: false,
        prevUrl: "/",
        toggle_mode: true,
        data: [],
    },
    reducers: {
        switchMode: (state, action) => {
            localStorage.setItem('mode', !action.payload)
            state.active = !action.payload
        },
        saveURL: (state, action) => {
            localStorage.setItem('prevUrl', action.payload);
            state.prevUrl = action.payload
        },
        deleteSearch: (state, action) => {
            let currentData = JSON.parse(localStorage.getItem("searchHistory")) || []
            if(currentData.length === 1) {
                localStorage.removeItem("searchHistory")
                currentData = []
            } else {
                currentData.splice(action.payload, 1)
                localStorage.setItem("searchHistory", JSON.stringify(currentData))
            }
            state.data = currentData
        },
        menuToggle: (state, action) => {
            state.toggle_mode = !action.payload
        }
    }
})

export default reducers;