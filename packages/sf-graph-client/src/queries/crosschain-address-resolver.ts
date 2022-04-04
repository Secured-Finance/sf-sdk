import { gql } from '@apollo/client';

export const CROSSCHAIN_ADDRESSES_BY_USER = gql`
    query CrosschainAddressesByUser($user: Bytes!, $skip: Int!) {
        crosschainAddresses(
            where: { user_contains: $user },
            skip: $skip,
        ) {
            id
            address
            ethAddress
            chainID
        }
    }
`;

export const CROSSCHAIN_ADDRESS_BY_ID = gql`
    query CrosschainAddressById($crosschainAddressId: String!) {
        crosschainAddress(
            id: $crosschainAddressId,
        ) {
            id
            address
            ethAddress
            chainID
        }
    }
`;
