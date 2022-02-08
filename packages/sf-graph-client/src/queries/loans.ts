import { gql } from '@apollo/client';

export const LOAN_DEALS = gql`
    query LoanDeals($account: Bytes!, $skip: Int!) {
        loans (where: {lender: $account}, skip: $skip) {
            id
            lender
            borrower
            currency
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
`

export const BORROW_DEALS = gql`
    query BorrowDeals($account: Bytes!, $skip: Int!) {
        loans (where: {borrower: $account}, skip: $skip) {
            id
            lender
            borrower
            currency
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
`

export const LOAN_INFO = gql`
    query Loan($id: String!) {
        loan (id: $id) {
            id
            lender
            borrower
            currency
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
`

export const LOAN_TERMINATION = gql`
    query LoanTermination($id: String!) {
        loan (id: $id) {
            termination {
                id
                terminationAsker
                terminationSubmitter
                terminationDate
                repayment
            }
        }
    }
`

export const LOAN_NOVATION_HISTORY = gql`
    query LoanNovationHistory($id: String!, $skip: Int!) {
        loan (id: $id) {
            novationHistory (skip: $skip) {
                id
                previousLender
                newLender
                novationDate
            }
        }
    }
`
