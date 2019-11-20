import moment from 'moment';

export const getStartDate = startTime => (!startTime ? '' : moment(startTime).format('ddd D, MMM YYYY'));

export const getTimeRange = (startTime, endTime) => {
  const eventStartTime = !startTime ? '' : moment(startTime).format('HH:mm');
  const eventEndTime = !endTime ? '' : moment(endTime).format('HH:mm');
  return `${eventStartTime} - ${eventEndTime}`;
};

export const getDateRange = (startTime, endTime) => {
  const eventStartDate = !startTime ? '' : moment(startTime).format('ddd D, MMM YYYY');
  const eventEndDate = !endTime ? '' : moment(endTime).format('ddd D, MMM YYYY');
  return `${eventStartDate} - ${eventEndDate}`;
};

export const checkIfTodayInRange = (startTime, endTime) => {
  const eventStartDate = !startTime ? null : moment(startTime);
  const eventEndDate = !endTime ? null : moment(endTime);

  if (eventStartDate && !eventEndDate) {
    return eventStartDate <= moment();
  }

  if (!eventStartDate && eventEndDate) {
    return eventEndDate >= moment();
  }

  if (eventStartDate && eventEndDate) {
    const now = moment();
    return eventStartDate <= now && eventEndDate >= now;
  }

  return false;
};
