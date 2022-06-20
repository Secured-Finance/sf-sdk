import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useBorrowingDeals,
    useLendingDeals,
    useLoanInfo,
    useLoanNovationHistory,
    useLoanTermination,
} from '../../src/hooks';
import {
    dealId,
    user,
    validateCurrency,
    validateLoan,
    validateLoanNovation,
    validateLoanPaymentSchedule,
    validateLoanTermination,
} from '../utils';

describe('useBorrowingDeals hook test', () => {
    it("Should return all borrowing deals if user's address is empty", async () => {
        const { result } = renderHook(() => useBorrowingDeals(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loans !== undefined) {
            expect(result.current.data?.loans).to.be.empty;
        }
    });

    it("Should return user's borrowing deals from subgraph", async () => {
        const { result } = renderHook(() => useBorrowingDeals(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loans !== undefined) {
            const loans = result.current.data.loans;

            for (let i = 0; i < loans.length; i++) {
                validateLoan(loans[i]);
                validateCurrency(loans[i].currency);
            }
        }
    });
});

describe('useLendingDeals hook test', () => {
    const user = '0x57ab42d4fa756b6956b0caf986a5f53ba90d9e28';

    it("Should return all lend deals if user's address is empty", async () => {
        const { result } = renderHook(() => useLendingDeals(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loans !== undefined) {
            expect(result.current.data?.loans).to.be.empty;
        }
    });

    it("Should return user's existing lend deals from subgraph", async () => {
        const { result } = renderHook(() => useLendingDeals(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loans !== undefined) {
            const loans = result.current.data.loans;

            for (let i = 0; i < loans.length; i++) {
                validateLoan(loans[i]);
            }
        }
    });
});

describe('useLoanInfo hook test', () => {
    it("Should return undefined if user's address is empty", async () => {
        const { result } = renderHook(() => useLoanInfo(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.loan).to.be.undefined;
    });

    it('Should return loan information from subgraph', async () => {
        const { result } = renderHook(() => useLoanInfo(dealId));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loan !== undefined) {
            const loan = result.current.data.loan;
            const paymentSchedule = loan?.schedule?.payments;

            validateLoan(loan);

            for (let i = 0; i < paymentSchedule.length; i++) {
                validateLoanPaymentSchedule(paymentSchedule[i]);
            }

            validateCurrency(loan?.currency);
        }
    });
});

describe('useLoanNovationHistory hook test', () => {
    it('Should return empty array if loan deal is empty', async () => {
        const { result } = renderHook(() => useLoanNovationHistory(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loanNovations !== undefined) {
            expect(result.current.data?.loanNovations).to.be.empty;
        }
    });

    it('Should return loan novation history from subgraph', async () => {
        const { result } = renderHook(() => useLoanNovationHistory(dealId));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loanNovations !== undefined) {
            const loanNovations = result.current.data.loanNovations;

            for (let i = 0; i < loanNovations.length; i++) {
                validateLoanNovation(loanNovations[i]);
                validateLoan(loanNovations[i].loan);
            }
        }
    });
});

describe('useLoanTermination hook test', () => {
    it('Should return empty array if loan deal id is empty', async () => {
        const { result } = renderHook(() => useLoanTermination(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loanTerminations !== undefined) {
            expect(result.current.data?.loanTerminations).to.be.empty;
        }
    });

    it('Should return loan termination data from subgraph', async () => {
        const { result } = renderHook(() => useLoanTermination(dealId));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.loanTerminations !== undefined) {
            const terminations = result.current.data.loanTerminations;

            for (let i = 0; i < terminations.length; i++) {
                validateLoanTermination(terminations[i]);
            }
        }
    });
});
