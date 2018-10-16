import moment from 'moment';

export const getDate = (startTime) => {
  const startDate = moment.utc(startTime).startOf('day'); // moment object

  return {
    year: startDate.year(),
    month: startDate.month() + 1,
    day: startDate.date(),
    timestamp: startDate.unix(),
    dateString: startDate.format('YYYY-MM-DD'),
  };
};

// TODO: sum offset
// See how timepicer works
export const getTime = (startTime) => {
  return new Date(startTime);
  // const date = new Date(startTime);
  // new Date.UTC(startTime)
  // return new Date(moment.utc(startTime).toISOString());
  // moment.utc(startTime).format('HH:mm')
  /* const startTimeUTC = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ); */

  // return new Date(startTimeUTC);
};

export const getDuration = (startTime, endTime) => {
  const start = moment.utc(startTime);
  const end = moment.utc(endTime);
  return parseInt(end.diff(start, 'minutes'), 10);
};
