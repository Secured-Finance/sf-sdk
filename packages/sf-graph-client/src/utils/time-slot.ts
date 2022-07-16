import { utils } from 'ethers';
import moment from 'moment';

export const timeSlotPosition = (year: number, month: number, day: number) => {
    const encodedPosition = utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [year, month, day]
    );
    return utils.keccak256(encodedPosition);
};

export const timeSlotPositionByTimestamp = (unixTimestamp: number) => {
    const date = moment.unix(unixTimestamp);

    const year = date.utc().year();
    const month = date.utc().month() + 1;
    const day = date.utc().date();

    const encodedPosition = utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [year, month, day]
    );
    return utils.keccak256(encodedPosition);
};
