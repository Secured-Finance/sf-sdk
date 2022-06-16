import { useQuery } from '@apollo/client';
import { OpenLoansDocument, OpenLoansQuery } from '../../../.graphclient';
import { client } from '../../client';
import { generateCurrencyId, QueryResult } from '../../utils';

export const useOpenLoans = (
    account: string,
    ccyShortName: string,
    term: number
): QueryResult<OpenLoansQuery> => {
    const ccyId = generateCurrencyId(ccyShortName);

    const variables = {
        account: account.toLowerCase(),
        currency: ccyId,
        term: term,
    };

    const { error, data } = useQuery<OpenLoansQuery>(OpenLoansDocument, {
        variables: variables,
        client: client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.user?.loans) {
        return {
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
