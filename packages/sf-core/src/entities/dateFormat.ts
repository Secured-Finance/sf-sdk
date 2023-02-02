import * as dayjs from 'dayjs';

export const getUTCMonthYear = (timestamp: number, multiplier = 1000) => {
    const date = new Date(timestamp * multiplier);
    return dayjs(date.toUTCString()).format('MMMYY').toUpperCase();
};

export const formatDate = (timestamp: number, multiplier = 1000) => {
    return timestamp
        ? Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'GMT',
          }).format(new Date(timestamp * multiplier))
        : '';
};
