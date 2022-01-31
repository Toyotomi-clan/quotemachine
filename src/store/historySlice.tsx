import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import qoutes, {Quote} from "../models/qoutes";

export interface HistoryState {
    allQuotes: Array<Quote>,
    favouriteQuotes: Array<number>,
    currentQuote: Quote
}

const initialState : HistoryState = {
    allQuotes: [],
    favouriteQuotes: [],
    currentQuote: {author: "", text: ""}
}

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
      addfavourite: (state, action: PayloadAction<number>) => {
          if(action.payload === 0 || action.payload > state.allQuotes.length ){
              return;
          }
        state.favouriteQuotes.push(action.payload);
      },
      removeFromFavourite: (state, action: PayloadAction<number>) => {
          if(action.payload === 0){
              return;
          }
          state.favouriteQuotes = state.favouriteQuotes.filter(x => x !== action.payload);
      },
      addQuotes: (state,action : PayloadAction<Quote[]>) => {

            state.allQuotes = action.payload;
        },
        setCurrentQuote: (state,action : PayloadAction<Quote>) => {

            state.currentQuote = action.payload;
        },
        randomQuote: (state) => {

            let rand =  ((Math.random() * state.allQuotes.length - 1) + 1);

            state.currentQuote = state.allQuotes[rand];
        },
    }
})

//Action creators is created for each case in the reducer function
export const {addfavourite,addQuotes,removeFromFavourite,setCurrentQuote,randomQuote} = historySlice.actions;

export default historySlice.reducer;