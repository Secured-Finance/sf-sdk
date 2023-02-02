import * as dayjs from 'dayjs';

export const getUTCMonthYear = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return dayjs(date.toUTCString()).format('MMMYY').toUpperCase();
};

export const formatDate = (timestamp: number) => {
    return timestamp
        ? Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'GMT',
          }).format(new Date(timestamp * 1000))
        : '';
};
