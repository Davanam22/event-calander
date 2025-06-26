import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import DayCell from './DayCell';

const MonthlyView = ({ currentDate, events, onDayClick, setShowForm, setEditingEvent, deleteEvent, updateEvent, addEvent, moveEvent }) => {
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="grid grid-cols-7 gap-1 calendar-grid">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="text-center font-semibold">
          {day}
        </div>
      ))}
      {days.map((day) => (
        <DayCell
          key={day}
          day={day}
          events={events.filter((event) => isSameDay(parseISO(event.date), day))}
          onDrop={(item) => {
            const dropDate = format(day, 'yyyy-MM-dd');
            moveEvent(item.id, dropDate);
          }}
          onClick={() => {
            onDayClick(format(day, 'yyyy-MM-dd'));
            setShowForm(true);
          }}
          setEditingEvent={setEditingEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
};

export default MonthlyView;