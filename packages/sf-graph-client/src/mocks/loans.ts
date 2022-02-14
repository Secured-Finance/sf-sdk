import { LOAN_DEALS } from "../queries";

export const loanQueriesMock = [
    {
        request: {
            query: LOAN_DEALS,
            variables: {
                account: '0x1',
                skip: 0,
            },
        },
        result: {
            data: {
                loans: [{
                    id: '',
                    lender: '0x',
                    borrower: '0x',
                    currency: '0x',
                    term: '0x',
                    notional: 10000,
                    couponPayment: 500,
                    rate: 5000,
                    startTimestamp: 1000,
                    endTimestamp: 1000,
                    presentValue: 10000,
                    state: 0,
                }],
            },
        },
    },
    {
        request: {
          query: LOAN_DEALS,
          variables: {
              account: '0x0',
              skip: 0,
          },
        },
        error: new Error('Network error'),
    },  
];
