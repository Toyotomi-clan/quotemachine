import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Quote from "../models/qoutes";

export const quoteApi = createApi({

    baseQuery: fetchBaseQuery({baseUrl: "https://type.fit/api/"}),
    tagTypes: ["hello"],
    endpoints: (builder) =>({
        getQuote: builder.query<Quote[],void>({
            query: () => {return `quotes`},

        })}),
    reducerPath: "quoteApi"

})

export const {useGetQuoteQuery }  = quoteApi;

export default quoteApi;

