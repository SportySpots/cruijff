export const timeStringToDate = (timeString) => {
  const hours = timeString.split(':')[0];
  const minutes = timeString.split(':')[1];
  return new Date(Date.UTC(2016, 6, 6, hours, minutes, 0));
};

export const dateStringToTimeString = (dateString) => {
  const date = new Date(dateString);
  return (
    `${(date.getHours() < 10 ? '0' : '') +
    date.getHours()
    }:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  );
};
