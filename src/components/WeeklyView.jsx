import { format, startOfWeek, endOfWeek, eachDayOfInterval, parseISO, isSameDay } from 'date-fns';
import DayCell from './DayCell';

const WeeklyView = ({ currentDate, events, onDayClick, setShowForm, setEditingEvent, deleteEvent }) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 0 }); // Start on Sunday
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid grid-cols-7 gap-1 calendar-grid sm:grid-cols-7">
      {days.map((day) => (
        <div key={day} className="text-center font-semibold text-sm">
          {format(day, 'EEE d')}
        </div>
      ))}
      {days.map((day) => (
        <DayCell
          key={day}
          day={day}
          events={events.filter((event) => isSameDay(parseISO(event.date), day))}
          onDrop={(item) => {
            setEditingEvent({ ...events.find((e) => e.id === item.id), date: format(day, 'yyyy-MM-dd') });
          }}
          onClick={() => {
            onDayClick(day);
            setShowForm(true);
          }}
          setEditingEvent={setEditingEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
};

export default WeeklyView;