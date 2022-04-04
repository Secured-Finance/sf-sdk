import { use } from 'chai';
import { utils } from 'ethers';
import moment from 'moment';

export const timeSlotPosition = (year: number, month: number, day: number) => {
    let encodedPosition = utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [year, month, day]
    );
    return utils.keccak256(encodedPosition);
};

export const timeSlotPositionByTimestamp = (unixTimestamp: number) => {
    const date = moment.unix(unixTimestamp);

    let year = date.utc().year();
    let month = date.utc().month() + 1;
    let day = date.utc().date();

    let encodedPosition = utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [year, month, day]
    );
    return utils.keccak256(encodedPosition);
};

export const resourceID = (
    resourceShortCode: string | number,
    user: string,
    ironcoreUserId: string
) => {
    let encodedPosition = utils.defaultAbiCoder.encode(
        ['bytes32', 'string', 'string'],
        [resourceShortCode, user, ironcoreUserId]
    );
    return utils.keccak256(encodedPosition);
};
