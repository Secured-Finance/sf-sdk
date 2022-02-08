import { ApolloProvider } from "@apollo/client";
import * as React from 'react';
import { client } from "./client";
import  * as utils  from './utils';

export { 
    useBorrowOrderbook,
    useBorrowingDeals,
    useCloseOutNetting,
    useCloseOutNettings,
    useCurrencies,
    useCurrencyInfo,
    useLendOrderbook,
    useLendingDeals,
    useLendingMarketInfo,
    useLendingTradingHistory,
    useLoanInfo,
    useLoanNovationHistory,
    useLoanTermination,
    useProductInfo,
    useProducts,
    useTermInfo,
    useTerms,
    useTimeSlotInfo,
    useTimeSlots
} from './hooks';

export {
    utils,
    client 
}

interface GraphClientProviderProps{
    children: React.ReactNode | React.ReactNode[] | null;
}

export const GraphClientProvider: React.FC<GraphClientProviderProps> = ({children}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
