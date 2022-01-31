import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RootState} from "./store/store";
import {useSelector,useDispatch} from "react-redux";
import {addQuotes, addfavourite, removeFromFavourite, setCurrentQuote, randomQuote} from "./store/historySlice";
import {useGetQuoteQuery} from "./store/quoteSlice"

function App() {
  const quote = useSelector((state : RootState)=> state.history.currentQuote)
  const dispatch = useDispatch();
  const {data, error,isLoading} =  useGetQuoteQuery();

  if(isLoading){
      return <p>Data is loading</p>
  }
  if(error){
      return <p>Something went wrong sorrrrrry!</p>
  }
  if(data && data.length){
      dispatch(addQuotes(data))
      if(quote.author == "" || quote.text == "") {
          dispatch(setCurrentQuote(data[0]))
      }
  }
  return (
    <div id="quote-box">

        <p id="text">{quote.text}</p>
        <p id="author">{quote.author}</p>

        <button id="new-quote" type="submit" value="Submit" onClick={(event) => {
            event.preventDefault();
            dispatch(randomQuote())}}> New Quote </button>

        <span className="material-icons " onClick={() => {dispatch(addfavourite(quote))}}>favorite</span>
    </div>
  );
}

export default App;
