import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import qoutes, {Quote} from "../models/qoutes";

export interface HistoryState {
    allQuotes: Array<Quote>,
    favouriteQuotes: Array<number>,
    currentQuote: Quote
}

const emptyQuote : Quote = {
    author: "",
    text: ""
}

const initialState : HistoryState = {
    allQuotes: [],
    favouriteQuotes: [],
    currentQuote: emptyQuote
}


export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
      addfavourite: (state, action: PayloadAction<Quote>) => {
          if(action.payload === emptyQuote || state.allQuotes === [] ){
              return;
          }

          let quoteInArray = state.allQuotes.find((q,i) =>{
              return q.author === action.payload.author && q.text === action.payload.text
          });

          if(!quoteInArray){
              return;
          }
          let index = state.allQuotes.indexOf(quoteInArray)

          if(index === -1){
              return;
          }

          if(state.favouriteQuotes.includes(index)){
              return;
          }

          state.favouriteQuotes.push(index);
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

            let rand =  Math.floor(((Math.random() * state.allQuotes.length - 1) + 1));

            state.currentQuote = state.allQuotes[rand] || emptyQuote;
        },
    }
})

//Action creators is created for each case in the reducer function
export const {addfavourite,addQuotes,removeFromFavourite,setCurrentQuote,randomQuote} = historySlice.actions;

export default historySlice.reducer;