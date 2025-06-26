import { useDrop } from 'react-dnd';
import { format, parseISO, isSameDay } from 'date-fns';
import Event from './Event';

const DayCell = ({ day, events, onDrop, onClick, setEditingEvent, deleteEvent }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item) => onDrop(item, day),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border p-2 h-32 overflow-y-auto ${isOver ? 'bg-blue-100' : ''} ${
        isSameDay(day, new Date()) ? 'bg-yellow-100' : ''
      }`}
      onClick={() => onClick(day)}
    >
      <div className="text-sm font-semibold">{format(day, 'd')}</div>
      {events.map((event) => (
        <Event
          key={event.id}
          event={event}
          onEdit={() => setEditingEvent(event)}
          onDelete={() => deleteEvent(event.id)}
        />
      ))}
    </div>
  );
};

export default DayCell;