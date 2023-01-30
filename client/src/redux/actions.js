export const switchMode = (data) => {
    let newState = !data
    localStorage.setItem('mode', newState)
    return {
        type: 'SWITCH',
        payload: newState
    } 
}

export const saveURL = (data) => {
    localStorage.setItem('prevUrl', data);
    return {
        type: 'SAVE',
        payload: data
    }
}

export const deleteSearch = (data) => {
    let currentData = JSON.parse(localStorage.getItem("searchHistory")) || []
    if(currentData.length === 1) {
        localStorage.removeItem("searchHistory")
        currentData = []
    } else {
        currentData.splice(data, 1)
        localStorage.setItem("searchHistory", JSON.stringify(currentData))
    }
    return {
        type: 'DELETE_SEARCH',
        payload: data
    }
}


export const menuToggle = (data) => {
    let toggle = !data
    return {
        type: 'TOGGLE',
        payload: toggle
    }
}