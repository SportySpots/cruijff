import moment from 'moment';

const getHoursMinutes = (dateString) => {
  const date = new Date(dateString);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
};

export const formatDate = date => (
  moment.utc(date).startOf('day') // moment object
);

export const formatStartTime = (startDate, time) => {
  const { hours, minutes } = getHoursMinutes(time);
  return startDate.clone().add(hours, 'hours').add(minutes, 'minutes'); // moment object
};

export const formatEndTime = (startTime, duration) => (
  startTime.clone().add(duration, 'minutes') // moment object
);
