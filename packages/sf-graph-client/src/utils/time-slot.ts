import { utils } from 'ethers';
import moment from 'moment';

export const timeSlotPosition = (year: number, month: number, day: number) => {
    let encodedPosition = utils.defaultAbiCoder.encode([ "uint256", "uint256", "uint256" ], [ year, month, day ]);
    return utils.keccak256(encodedPosition);
}

export const timeSlotPositionByTimestamp = (unixTimestamp: number) => {
    const date = moment.unix(unixTimestamp);

    let year = date.utc().year();
    let month = (date.utc().month() + 1);
    let day = date.utc().date();

    let encodedPosition = utils.defaultAbiCoder.encode([ "uint256", "uint256", "uint256" ], [ year, month, day ]);
    return utils.keccak256(encodedPosition);
}
