//import { createStore } from "redux";
//import { composeWithDevTools } from 'redux-devtools-extension'

//const composedEnhancers = composeWithDevTools()

//const store = createStore(rootReducer, false,composedEnhancers);
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducer';
import detail from './detail';

const store = configureStore({
    reducer: {
        mainReducer: reducers.reducer,
        detailReducer: detail.reducer
    },
})
export default store;
