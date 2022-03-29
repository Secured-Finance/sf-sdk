import { utils } from 'ethers/lib/ethers';

export const hashPosition = (year: number, month: number, day: number) => {
    let encodedPosition = utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [year, month, day]
    );
    return utils.keccak256(encodedPosition);
};
