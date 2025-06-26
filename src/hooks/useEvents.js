import { useState, useEffect } from 'react';
import { parseISO, isSameDay, addDays, addWeeks, addMonths, format } from 'date-fns';

const useEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const checkConflict = (newEvent) => {
    const newEventDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
    return events.some((event) => {
      if (event.id === newEvent.id) return false;
      const eventDateTime = new Date(`${event.date}T${event.time}`);
      return isSameDay(newEventDateTime, eventDateTime) && Math.abs(newEventDateTime - eventDateTime) < 30 * 60 * 1000;
    });
  };

  const generateRecurringEvents = (event) => {
    const eventDates = [event];
    const startDate = parseISO(event.date);
    const endDate = addMonths(startDate, 12);

    if (event.recurrence === 'daily') {
      let current = startDate;
      while (current <= endDate) {
        eventDates.push({ ...event, id: `${event.id}-${format(current, 'yyyyMMdd')}`, date: format(current, 'yyyy-MM-dd') });
        current = addDays(current, 1);
      }
    } else if (event.recurrence === 'weekly') {
      let current = startDate;
      while (current <= endDate) {
        eventDates.push({ ...event, id: `${event.id}-${format(current, 'yyyyMMdd')}`, date: format(current, 'yyyy-MM-dd') });
        current = addWeeks(current, 1);
      }
    } else if (event.recurrence === 'monthly') {
      let current = startDate;
      while (current <= endDate) {
        eventDates.push({ ...event, id: `${event.id}-${format(current, 'yyyyMMdd')}`, date: format(current, 'yyyy-MM-dd') });
        current = addMonths(current, 1);
      }
    }
    return eventDates;
  };

  const addEvent = (event) => {
    if (checkConflict(event)) {
      alert('Event conflicts with another event at the same time.');
      return;
    }
    const recurringEvents = generateRecurringEvents({ ...event, id: Date.now().toString() });
    setEvents((prev) => [...prev, ...recurringEvents]);
  };

  const updateEvent = (updatedEvent) => {
    if (checkConflict(updatedEvent)) {
      alert('Event conflicts with another event at the same time.');
      return;
    }
    setEvents((prev) => {
      if (prev.some((e) => e.id === updatedEvent.id)) {
        return prev.map((e) =>
          e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e
        );
      }
      const updated = prev.filter((e) => !e.id.startsWith(updatedEvent.id));
      const recurringEvents = generateRecurringEvents(updatedEvent);
      return [...updated, ...recurringEvents];
    });
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => !e.id.startsWith(id)));
  };

  const moveEvent = (id, newDate) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === id ? { ...ev, date: newDate } : ev
      )
    );
  };

  return { events, addEvent, updateEvent, deleteEvent, moveEvent };
};

export default useEvents;