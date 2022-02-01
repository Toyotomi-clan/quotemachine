export  interface Quote{
    author: string,
    text: string
}
export interface QuoteMachine{
    [id: number]: Quote
}
export const QuoteMachineInitialState : QuoteMachine  ={
}
export interface CurrentQuote {
    id: number,
    quote: Quote
}
export const QuoteInitialState : Quote = {
    author: "",
    text: ""
}
export const CurrentQuoteInitialState : CurrentQuote = {
    id: 0,
    quote: QuoteInitialState
}



export default  Quote;