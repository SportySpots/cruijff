import moment from 'moment';

const dateStringToTimeString = (dateString) => {
  const date = new Date(dateString);
  return (
    `${(date.getHours() < 10 ? '0' : '') +
    date.getHours()
    }:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  );
};

export const setDate = (date) => {
  console.log('setDate date', date);
  const now = new Date();

  const startTime = moment(`${date}T${moment(now).format('HH:mm:ss')}`).toISOString();
  const endTime = moment(`${date}T${moment(now).format('HH:mm:ss')}`).toISOString();

  console.log({ startTime, endTime });

  return { startTime, endTime };
};

export const setStartTime = (date, startTime) => {
  console.log(
    'setStartTime',
    'date', date,
    'startTime', startTime,
  );
  const timeString = `${dateStringToTimeString(date)}:00`;
  const newStartTime = moment(`${moment(startTime).format('YYYY-MM-DD')}T${timeString}`).toISOString();
  console.log('newStartTime', newStartTime);

  return newStartTime;
};

export const setEndTime = (date, endTime) => {
  console.log(
    'setEndTime',
    'date', date,
    'endTime', endTime,
  );
  const timeString = `${dateStringToTimeString(date)}:00`;
  const newEndTime = moment(`${moment(endTime).format('YYYY-MM-DD')}T${timeString}`).toISOString();
  console.log('newEndTime', newEndTime);
  return newEndTime;
};
