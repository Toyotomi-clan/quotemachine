import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Quote, {QuoteInitialState, QuoteMachineInitialState, QuoteMachine} from "../models/qoutes";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";


export const quoteApi = createApi({

    baseQuery: fetchBaseQuery({baseUrl: `${window.location.origin}`}),
    tagTypes: ["hello"],
    endpoints: (builder) =>({
        getQuote: builder.query<QuoteMachine,void>({

            query: () => {return `quotes.json`},

            transformResponse: (baseQueryReturnValue, meta, arg) =>
            {
                let quotes = <Quote[]> baseQueryReturnValue || [];

                let quoteMachine : QuoteMachine = QuoteMachineInitialState;

                if(!quotes)
                {
                    return quoteMachine;
                }

                for(let i = 0; i < quotes.length; i++){
                    quoteMachine[i] = quotes[i];
                }

                return quoteMachine
            }
        })}),
    reducerPath: "quoteApi"

})

export const {useGetQuoteQuery }  = quoteApi;

export default quoteApi;

