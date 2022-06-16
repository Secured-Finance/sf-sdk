import { gql } from '@apollo/client';

export const TIME_SLOTS = gql`
    query TimeSlots($address: Bytes!, $skip: Int!) {
        timeSlots(where: { addresses_contains: $address }, skip: $skip) {
            id
            address0
            address1
            addresses
            totalPayment0
            totalPayment1
            netPayment
            paidAmount
            year
            month
            day
            position
            flipped
            isSettled
            currency {
                shortName
                name
            }
        }
    }
`;

export const TIME_SLOT = gql`
    query TimeSlot($id: Bytes!) {
        timeSlot(id: $id) {
            id
            address0
            address1
            addresses
            totalPayment0
            totalPayment1
            netPayment
            paidAmount
            year
            month
            day
            position
            flipped
            isSettled
            currency {
                shortName
                name
            }
        }
    }
`;
