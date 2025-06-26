import { parseISO, isSameDay, addDays, addWeeks, addMonths, format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

// Generate an array of days for a given week
export const generateWeekDays = (date, options = { weekStartsOn: 0 }) => {
  const start = startOfWeek(date, options);
  const end = endOfWeek(date, options);
  return eachDayOfInterval({ start, end });
};

// Check if an event occurs on a specific day
export const isEventOnDay = (event, day) => {
  return isSameDay(parseISO(event.date), day);
};

// Generate recurring event dates
export const generateRecurringEvents = (event) => {
  const eventDates = [{ ...event }];
  const startDate = parseISO(event.date);
  const endDate = addMonths(startDate, 12); // Limit recurrence to 1 year

  if (event.recurrence === 'daily') {
    let current = startDate;
    while (current <= endDate) {
      eventDates.push({
        ...event,
        id: `${event.id}-${format(current, 'yyyyMMdd')}`,
        date: format(current, 'yyyy-MM-dd'),
      });
      current = addDays(current, 1);
    }
  } else if (event.recurrence === 'weekly') {
    let current = startDate;
    while (current <= endDate) {
      eventDates.push({
        ...event,
        id: `${event.id}-${format(current, 'yyyyMMdd')}`,
        date: format(current, 'yyyy-MM-dd'),
      });
      current = addWeeks(current, 1);
    }
  } else if (event.recurrence === 'monthly') {
    let current = startDate;
    while (current <= endDate) {
      eventDates.push({
        ...event,
        id: `${event.id}-${format(current, 'yyyyMMdd')}`,
        date: format(current, 'yyyy-MM-dd'),
      });
      current = addMonths(current, 1);
    }
  }

  return eventDates;
};

// Check for event conflicts (within 30 minutes)
export const checkEventConflict = (newEvent, existingEvents) => {
  const newEventDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
  return existingEvents.some((event) => {
    if (event.id === newEvent.id) return false;
    const eventDateTime = new Date(`${event.date}T${event.time}`);
    return isSameDay(newEventDateTime, eventDateTime) && Math.abs(newEventDateTime - eventDateTime) < 30 * 60 * 1000;
  });
};