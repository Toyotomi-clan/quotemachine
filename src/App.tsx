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
import {useGetQuoteQuery} from "./Service/quoteService"
import {CurrentQuote} from "./models/qoutes";
import {Dispatch} from "@reduxjs/toolkit";

import {
    Flex,
    VStack,
    Box,
    Button,
    Center,
    Divider,
    Text,
    Code,
    HStack,
    Square,
    Grid,
    GridItem,
    SimpleGrid
} from "@chakra-ui/react";
import Favourites from './Favourites';
import DrawerExample from "./Favourites";

function toggleFavouriteQuote(isFavourite: boolean, dispatch: Dispatch<any>, currentQuote: CurrentQuote) {
    if (isFavourite) {
        dispatch(removeFromFavourite(currentQuote))
    } else {
        dispatch(addfavourite(currentQuote))
    }
}

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

    <Flex  w={'full'} h={'100vh'} justify={'center'}>
          <Square>
              <SimpleGrid  columns={1} spacing={2} w={'full'}   id="quote-box">
                <Flex alignItems={'center'}>
                <Box  shadow={'sm'}>
                  <Center height='50px'>
                      <Code role={'quote'} colorScheme={'twitter'} id={'text'}>{currentQuote.quote.text}</Code>
                      <Divider orientation='vertical' />
                      <Text role={'author'} id={'author'}>{currentQuote.quote.author}</Text>
                  </Center>
                </Box>
                  <Box alignItems={'center'} className={"material-icons"} onClick={() => {
                      toggleFavouriteQuote(isFavourite, dispatch, currentQuote);
                  }}>
                      {isFavourite ? "star" : "star_border"}
              </Box>
                </Flex>
                  <Box textAlign={'center'} >
                      <Center height='100px'>

                      <Button colorScheme="blue" id="new-quote" type="submit" value="Submit" onClick={(event) => {
                          event.preventDefault();
                          dispatch(randomQuote())
                      }}> Get Inspired </Button>
                          <Divider orientation='vertical' />

                      <Favourites/>

                           <a id={"tweet-quote"}
                              href={`https://twitter.com/intent/tweet?hashtags=${currentQuote.quote.author.replace(" ","")},quoteOfTheDay&text=${currentQuote.quote.text}`}>
                               <span className="material-icons">share</span></a>
                  </Center>
                  </Box>


              </SimpleGrid>

          </Square>
      </Flex>
  );
}

export default App;
