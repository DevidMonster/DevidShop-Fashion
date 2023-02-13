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
        user: JSON.parse(localStorage.getItem("user")) || false,
        active: false,
        prevUrl: "/",
        toggle_mode: true,
        data: JSON.parse(localStorage.getItem("searchHistory")) || [],
        cateSelected: {
            _id: "lord",
            name: "All"
        },
        filter: {
            id: 1,
            value: "default",
            label: "Default"
        },
        openModal: { 
            bool: false, 
            type: "login"
        },
        contentNotice: {}
    },
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user")
            state.user = false
        },
        currentUser: (state, action) => {    
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.user = action.payload
        },
        switchMode: (state, action) => {
            let newState = !action.payload
            localStorage.setItem('mode', newState)
            state.active = !state.active
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
        },
        changeCate: (state, action) => {
            state.cateSelected = action.payload
        },
        selectFilter: (state, action) => {
            state.filter = action.payload
        },
        toggleModel: (state, action) => {
            if(action.payload) {
                state.openModal = action.payload
            } else {
                state.openModal.bool = !state.openModal.bool
            }
        },
        notification: (state, action) => {
            state.contentNotice = action.payload
        }
    }
})

export default reducers;