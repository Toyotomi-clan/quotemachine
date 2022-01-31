import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import quoteApi from "./quoteSlice";
import historyReducer from "./historySlice"

export const store = configureStore({
    reducer: {
        history : historyReducer,
        [quoteApi.reducerPath]:quoteApi.reducer
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(quoteApi.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)