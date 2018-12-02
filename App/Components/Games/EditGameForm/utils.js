/* import moment from 'moment';

// startTime is UTC date (not moment)
export const getDate = (startTime) => {
  const startDate = moment.utc(startTime).startOf('day'); // moment UTC object

  return {
    year: startDate.year(),
    month: startDate.month() + 1,
    day: startDate.date(),
    timestamp: startDate.unix(),
    dateString: startDate.format('YYYY-MM-DD'),
  };
};

// startTime is UTC date (not moment)
export const getTime = startTime => (
  moment.utc(startTime).toDate()
);

// startTime and endTime are UTC dates (not moment)
export const getDuration = (startTime, endTime) => {
  const start = moment.utc(startTime);
  const end = moment.utc(endTime);
  return parseInt(end.diff(start, 'minutes'), 10);
};
*/