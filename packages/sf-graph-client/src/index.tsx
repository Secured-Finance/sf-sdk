import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { client } from './client';
import * as utils from './utils';

export {
    useBilateralPosition,
    useBilateralPositionFromVault,
    useBilateralPositionsFromVault,
    useBorrowingDeals,
    useBorrowOrderbook,
    useCloseOutNetting,
    useCloseOutNettings,
    useCollateralAggregator,
    useCollateralBookFromVault,
    useCollateralVault,
    useCrosschainAddressById,
    useCrosschainAddressesByUser,
    useCurrencies,
    useCurrencyInfo,
    useLendingDeals,
    useLendingMarketInfo,
    useLendingTradingHistory,
    useLendOrderbook,
    useLoanInfo,
    useLoanNovationHistory,
    useLoanTermination,
    useOpenLoans,
    useOpenOrders,
    useOrdersTradingHistory,
    useProductInfo,
    useProducts,
    useTermInfo,
    useTerms,
    useTimeSlotInfo,
    useTimeSlots,
    useUnsettledPositions,
} from './hooks';
export { utils, client };

interface GraphClientProviderProps {
    children: React.ReactNode | React.ReactNode[] | null;
}

export const GraphClientProvider: React.FC<GraphClientProviderProps> = ({
    children,
}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
