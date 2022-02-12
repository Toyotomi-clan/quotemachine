import reducer, {
    addfavourite,
    addQuotes,
    defaultState,
    historySlice,
    HistoryState, randomQuote,
    removeFromFavourite, setCurrentQuote
} from "./historySlice";
import {CurrentQuote, CurrentQuoteInitialState, QuoteInitialState, QuoteMachine} from "../models/qoutes";
import {AnyAction} from "@reduxjs/toolkit";
import quoteSlice from "../Service/quoteService";

const action : AnyAction = {
    type: undefined
}


test("should return default state",() => {
    expect(reducer(undefined,action)).toEqual({
        ...defaultState
    })
})

test("Add quetes should add quotes to the system", () => {
    let defaultQuote : HistoryState = {
        allQuotes: {
          0:{
              author: "user1",
              text: "don't cry"
          }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: []
    }

    let allQuotes : QuoteMachine = {
        0: {
            author: "user1",
            text: "don't cry"
        }
    }
    expect(reducer(defaultState,addQuotes(allQuotes))).toEqual(
        defaultQuote
    )
})

test("should be able to favourite quote",() => {
    const initialOutput : HistoryState = {
        allQuotes: {
            0:{
                author: "user1",
                text: "don't cry"
            }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [] // Should append 0 to it
    }

    let currentInput : CurrentQuote =  {
        id: 0,
        quote:
            {
                author: "user1",
                text: "don't cry"
            }
    }
    let expectedOutput : HistoryState = {
        allQuotes: {
            0:{
                author: "user1",
                text: "don't cry"
            }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [currentInput.id] // Should append current input as that is what is being favoured
    }
    expect(reducer(initialOutput,addfavourite(currentInput))).toEqual(
        expectedOutput
    )
})

test("should be able to remove favourite",() => {
    const initialOutput : HistoryState = {
        allQuotes: {
            0:{
                author: "user1",
                text: "don't cry"
            }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [0] // Should append 0 to it
    }

    let currentInput : CurrentQuote =  {
        id: 0,
        quote:
            {
                author: "user1",
                text: "don't cry"
            }
    }
    let expectedOutput : HistoryState = {
        allQuotes: {
            0:{
                author: "user1",
                text: "don't cry"
            }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [] // Should append current input as that is what is being favoured
    }
    expect(reducer(initialOutput,removeFromFavourite(currentInput))).toEqual(
        expectedOutput
    )
})

test("should be able to set current quote",() => {
    const initialOutput : HistoryState = {
        allQuotes: {},
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [] // Should append 0 to it
    }

    let currentInput : CurrentQuote =  {
        id: 2,
        quote:
            {
                author: "user1",
                text: "don't cry"
            }
    }
    let expectedOutput : HistoryState = {
        allQuotes: {},
        currentQuote: currentInput,
        favouriteQuotes: [] // Should append current input as that is what is being favoured
    }
    expect(reducer(initialOutput,setCurrentQuote(currentInput))).toEqual(
        expectedOutput
    )
})

test("should be get a random quote",() => {
    const initialOutput : HistoryState = {
        allQuotes: {
            0: {
                        author: "user1",
                        text: "don't cry"
            },
            1: {
                author: "user2",
                text: "don't cry"
            },
            2: {
                author: "user3",
                text: "don't cry"
            },
            3: {
                author: "user4",
                text: "don't cry"
            }
        },
        currentQuote: CurrentQuoteInitialState,
        favouriteQuotes: [] // Should append 0 to it
    }

    let currentInput : CurrentQuote =  {
        id: 2,
        quote:
            {
                author: "user1",
                text: "don't cry"
            }
    }

    expect(reducer(initialOutput,randomQuote())).not.toEqual(
        currentInput
    )
})