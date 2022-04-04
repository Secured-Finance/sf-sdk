import { useQuery } from '@apollo/client';
import { LENDING_MARKETS_BY_CCY } from '../../queries';
import { generateCurrencyId } from '../../utils';

export const useLendingMarkets = (ccyShortName: string, skip: number = 0) => {
    let currencyId = generateCurrencyId(ccyShortName);
    console.log(currencyId);

    const variables = {
        currency: currencyId,
        skip: skip,
    };

    const { loading, error, data } = useQuery(LENDING_MARKETS_BY_CCY, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.lendingMarkets) {
        return data.lendingMarkets;
    }
};
