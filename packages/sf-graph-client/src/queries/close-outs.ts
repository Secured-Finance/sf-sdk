import { gql } from '@apollo/client';

export const CLOSE_OUT_NETTINGS = gql`
    query CloseOutNettings($address0: Bytes!, $address1: Bytes!, $skip: Int!) {
        closeOutNettings(
            where: { address0: $address0, address1: $address1 }
            skip: $skip
        ) {
            id
            address0
            address1
            addresses
            packedAddresses
            aggregatedPayment0
            aggregatedPayment1
            netPayment
            currency {
                shortName
                name
            }
            flipped
        }
    }
`;

export const CLOSE_OUT_NETTING = gql`
    query CloseOutNetting($id: Bytes!) {
        closeOutNetting(id: $id) {
            id
            address0
            address1
            addresses
            packedAddresses
            aggregatedPayment0
            aggregatedPayment1
            netPayment
            flipped
            currency {
                shortName
                name
            }
        }
    }
`;
