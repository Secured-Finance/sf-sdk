export const getUTCMonthYear = (timestamp: number) => {
    return timestamp
        ? Intl.DateTimeFormat('en-US', {
              year: '2-digit',
              month: 'short',
              timeZone: 'GMT',
          })
              .format(new Date(timestamp * 1000))
              .replace(' ', '')
              .toUpperCase()
        : '';
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