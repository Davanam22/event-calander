import { useDrag } from 'react-dnd';

const Event = ({ event, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id, date: event.date },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-1 rounded text-white cursor-move ${isDragging ? 'opacity-50' : ''}`}
      style={{ backgroundColor: event.color }}
      onClick={() => onEdit(event)}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm truncate">{event.title}</span>
        <button
          className="text-red-200 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
        >
          🗑️
        </button>
      </div>
      <span className="text-xs">{event.time}</span>
    </div>
  );
};

export default Event;