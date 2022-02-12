import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {QuoteMachine} from "../models/qoutes";

export const quoteApi = createApi({

    baseQuery: fetchBaseQuery({baseUrl: `${window.location.origin}`}),
    tagTypes: ["quoteMachine"],
    endpoints: (builder) => ({
        getQuote: builder.query<QuoteMachine, void>({

            query: () => {
                return `quotes.json`
            },
        })
    }),
    reducerPath: "quoteApi"

})

export const {useGetQuoteQuery} = quoteApi;

export default quoteApi;

