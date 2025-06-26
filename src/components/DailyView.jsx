import { format, parseISO, isSameDay } from 'date-fns';
import DayCell from './DayCell';

const DailyView = ({ currentDate, events, onDayClick, setShowForm, setEditingEvent, deleteEvent }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center font-semibold text-lg mb-4">
        {format(currentDate, 'EEEE, MMMM d, yyyy')}
      </div>
      <DayCell
        day={currentDate}
        events={events.filter((event) => isSameDay(parseISO(event.date), currentDate))}
        onDrop={(item) => {
          setEditingEvent({ ...events.find((e) => e.id === item.id), date: format(currentDate, 'yyyy-MM-dd') });
        }}
        onClick={() => {
          onDayClick(currentDate);
          setShowForm(true);
        }}
        setEditingEvent={setEditingEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default DailyView;