import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RootState} from "./store/store";
import {useSelector,useDispatch} from "react-redux";
import {
    addQuotes,
    addfavourite,
    removeFromFavourite,
    setCurrentQuote,
    randomQuote
} from "./store/historySlice";
import {useGetQuoteQuery} from "./store/quoteSlice"
import {CurrentQuote} from "./models/qoutes";

function App() {
  const currentQuote = useSelector((state : RootState)=> state.history.currentQuote)
  const QuoteMachine = useSelector((state : RootState)=> state.history.allQuotes)
  const favouriteQuotes = useSelector((state : RootState)=> state.history.favouriteQuotes)
  const dispatch = useDispatch();
  const {data, error,isLoading} =  useGetQuoteQuery();
  let isFavourite = favouriteQuotes.indexOf(currentQuote.id) !== -1;
  if(isLoading){
      return <p>Data is loading</p>
  }
  if(error){
      return <p>Something went wrong sorrrrrry!</p>
  }
  if(data && Object.keys(QuoteMachine).length === 0){
      dispatch(addQuotes(data))
      if(currentQuote.quote.author == "" || currentQuote.quote.text == "") {
          let currentQuote: CurrentQuote = {
              id: 0,
              quote: data[0]
          }
          dispatch(setCurrentQuote(currentQuote))
      }
  }
  return (
    <div id="quote-box">

        <p id="text">{currentQuote.quote.text}</p>
        <p id="author">{currentQuote.quote.author}</p>

        <button id="new-quote" type="submit" value="Submit" onClick={(event) => {
            event.preventDefault();
            dispatch(randomQuote())
        }}> New Quote </button>

        <span className={isFavourite ? "material-icons" : "material-icons-outlined"} onClick={() => {
            if(isFavourite){
                dispatch(removeFromFavourite(currentQuote))
            }
            else{
                dispatch(addfavourite(currentQuote))
            }
        }}>favorite</span>
    </div>
  );
}

export default App;
