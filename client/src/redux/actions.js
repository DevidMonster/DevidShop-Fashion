export const switchMode = (data) => {
    return {
        type: 'SWITCH',
        payload: data
    } 
}

export const saveURL = (data) => {
    return {
        type: 'SAVE',
        payload: data
    }
}

export const deleteSearch = (data) => {
    return {
        type: 'DELETE_SEARCH',
        payload: data
    }
}


export const menuToggle = (data) => {
    return {
        type: 'TOGGLE',
        payload: data
    }
}