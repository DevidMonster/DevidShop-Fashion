import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
    name: 'cartState',
    initialState: {
        cusId: null,
        name: "",
        subTotal: 0,
        address: "",
        phoneNumber: "",
        email: "",
        shipping: 20,
        paymentMethod: "cash",
        items: [],
        total: 0,
    },
    reducers: {
        addTotal: (state, action) => {
            state.total = action.payload;
        },
        addName: (state, action) => {
            state.name = action.payload
        },
        addCusId: (state, action) => {
            state.cusId = action.payload;
        },
        addSubTotal: (state, action) => {
            state.total = action.payload;
        },
        addAddress: (state, action) => {
            state.address = action.payload;
        },
        addPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        addEmail: (state, action) => {
            state.email = action.payload;
        },
        addPaymentMethod: (state, action) =>{
            state.paymentMethod = action.payload;
        },
        addItem: (state, action) => {
            state.items = action.payload
        }
    }
})

export default cart;