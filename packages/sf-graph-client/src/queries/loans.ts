import { gql } from '@apollo/client';

export const LOAN_DEALS = gql`
    query LoanDeals($account: Bytes!, $skip: Int!) {
        loans(where: { lender: $account }, skip: $skip) {
            id
            lender
            borrower
            currency {
                identifier
                shortName
                name
                chainId
            }
            term
            notional
            couponPayment
            rate
            startTimestamp
            endTimestamp
            presentValue
            state
        }
    }
`;

export const BORROW_DEALS = gql`
    query BorrowDeals($account: Bytes!, $skip: Int!) {
        loans(where: { borrower: $account }, skip: $skip) {
            id
            lender
            borrower
            currency {
                identifier
                shortName
                name
                chainId
            }
            term
            notional
            couponPayment
            rate
            startTimestamp
            endTimestamp
            presentValue
            state
        }
    }
`;

export const LOAN_INFO = gql`
    query Loan($id: String!) {
        loan(id: $id) {
            id
            lender
            borrower
            currency {
                identifier
                shortName
                name
                chainId
            }
            term
            notional
            couponPayment
            rate
            startTimestamp
            endTimestamp
            presentValue
            state
            schedule {
                payments {
                    id
                    notice
                    payment
                    amount
                    isDone
                    txHash
                }
            }
        }
    }
`;

export const LOAN_TERMINATION = gql`
    query LoanTermination($id: String!, $skip: Int!) {
        loanTerminations(where: { loan_contains: $id }, skip: $skip) {
            id
            terminationAsker
            terminationSubmitter
            terminationDate
            repayment
        }
    }
`;

export const LOAN_NOVATION_HISTORY = gql`
    query LoanNovationHistory($id: String!, $skip: Int!) {
        loanNovations(where: { loan_contains: $id }, skip: $skip) {
            id
            previousLender
            newLender
            novationDate
            loan {
                id
                term
            }
        }
    }
`;
