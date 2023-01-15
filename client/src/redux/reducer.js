const initState = {
    active: false
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "SWITCH": 
            let newState = !action.payload
            localStorage.setItem('mode', newState)
            return {
                ...state,
                active: newState
            }
        case "SAVE":
            // lưu URL
            localStorage.setItem('prevUrl', action.payload);
            return {
                ...state,
                // Thêm thuộc tính URL mới vào state
                prevUrl: action.payload,
            };
        case "TOGGLE":
            let toggle = !action.payload
            // localStorage.setItem('mode', toggle)
            return {
                ...state,
                toggle_mode: toggle,
            };
        case "DELETE_SEARCH":
            let currentData = JSON.parse(localStorage.getItem("searchHistory")) || []
            if(currentData.length === 1) {
                localStorage.removeItem("searchHistory")
                currentData = []
            } else {
                currentData.splice(action.payload, 1)
                localStorage.setItem("searchHistory", JSON.stringify(currentData))
            }
            return {
                ...state,
                // Thêm thuộc tính URL mới vào state
                data: currentData,
            };
        default :
            return state
            
    }
}

export default rootReducer;