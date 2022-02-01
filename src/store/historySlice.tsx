import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import qoutes, {
    CurrentQuote,
    QuoteInitialState,
    QuoteMachineInitialState,
    Quote,
    QuoteMachine,
    CurrentQuoteInitialState
} from "../models/qoutes";
import {stat} from "fs";

export interface HistoryState {
    allQuotes: QuoteMachine,
    favouriteQuotes: Array<number>,
    currentQuote: CurrentQuote,
}

const initialState : HistoryState = {
    allQuotes: [],
    favouriteQuotes: [],
    currentQuote: CurrentQuoteInitialState,
}


export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
      addfavourite: (state, action: PayloadAction<CurrentQuote>) => {
          if(state.allQuotes === QuoteMachineInitialState ){
              return;
          }
          if(action.payload.quote === QuoteInitialState){
              return;
          }

          if(!state.allQuotes.hasOwnProperty(action.payload.id)){
              return;
          }

          if(state.favouriteQuotes.indexOf(action.payload.id) !== -1){
              return;
          }

          state.favouriteQuotes.push(action.payload.id);
      },
      removeFromFavourite: (state, action: PayloadAction<CurrentQuote>) => {
          if(state.allQuotes === QuoteMachineInitialState ){
              return;
          }
          if(action.payload.quote === QuoteInitialState){
              return;
          }
          let index = state.favouriteQuotes.indexOf(action.payload.id);
          if(index === -1){
              return;
          }
          state.favouriteQuotes.splice(index,1);
      },
      addQuotes: (state,action : PayloadAction<QuoteMachine>) => {

            state.allQuotes = action.payload;
        },
        setCurrentQuote: (state,action : PayloadAction<CurrentQuote>) => {

            state.currentQuote = action.payload;
        },
        randomQuote: (state) => {

            let rand =  Math.floor(((Math.random() * Object.keys(state.allQuotes).length - 1) + 1));

            if(!state.allQuotes.hasOwnProperty(rand)){
                state.currentQuote = CurrentQuoteInitialState;
            }
            let newQuote: CurrentQuote = {
                id: rand,
                quote: state.allQuotes[rand]
            }

            state.currentQuote = newQuote;
        },
    }
})

//Action creators is created for each case in the reducer function
export const {addfavourite,addQuotes,removeFromFavourite,setCurrentQuote,randomQuote} = historySlice.actions;

export default historySlice.reducer;