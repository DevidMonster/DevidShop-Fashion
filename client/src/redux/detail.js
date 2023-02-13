import { createSlice } from '@reduxjs/toolkit';

const detail = createSlice({
    name: 'detailState',
    initialState: {
        color: {},
        size: {},
        quantity: 0,
        
        item: {    
            id: "",
            name: "",
            price: 0,
            images: "",
        }
    },
    reducers: {
        addColor: (state, action) => {
            state.color = action.payload
        },
        addSize: (state, action) => {
            state.size = action.payload
        },
        addQuantity: (state, action) => {
            state.quantity = action.payload
        },
        addItem: (state, action) => {
            const newItem = {
                ...action.payload,
                color: state.color,
                size: state.size,
                quantity: state.quantity
            }
            const carts = JSON.parse(localStorage.getItem("carts")) || []
            if(carts.length > 0) {
                let index = 0;
                const newCarts = carts.map(item => {
                    if(item.id === newItem.id) {
                        item.quantity += newItem.quantity
                        index += 1
                    }
                    return item
                })
                if(index > 0) {
                    localStorage.setItem("carts", JSON.stringify([...newCarts]))
                } else {
                    localStorage.setItem("carts", JSON.stringify([newItem, ...carts]))
                }
            } else {   
                localStorage.setItem("carts", JSON.stringify([newItem]))
            }
            state.item = newItem

        },
        removeItem: (state, action) => {
            const carts = JSON.parse(localStorage.getItem("carts"))
            const newCarts = carts.filter(item => item.id !== action.payload)
            localStorage.setItem("carts", JSON.stringify(newCarts))
        }
    }
})

export default detail;