import { format, addMonths, subMonths } from 'date-fns';

const CalendarHeader = ({ currentDate, setCurrentDate, setView, view }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      <h1 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h1>
      <div>
        <button
          onClick={() => setView('month')}
          className={`px-4 py-2 ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          Month
        </button>
        <button
          onClick={() => setView('week')}
          className={`ml-2 px-4 py-2 ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          Week
        </button>
        <button
          onClick={() => setView('day')}
          className={`ml-2 px-4 py-2 ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          Day
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;