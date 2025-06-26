import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CalendarHeader from './components/CalendarHeader';
import MonthlyView from './components/MonthlyView';
import WeeklyView from './components/WeeklyView';
import DailyView from './components/DailyView';
import EventForm from './components/EventForm';
import useEvents from './hooks/useEvents';
import { format } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const { events, addEvent, updateEvent, deleteEvent, moveEvent } = useEvents();

  const handleSaveEvent = (event) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <MonthlyView
            currentDate={currentDate}
            events={events}
            onDayClick={setSelectedDay}
            setShowForm={setShowForm}
            setEditingEvent={setEditingEvent}
            deleteEvent={deleteEvent}
            moveEvent={moveEvent}
            onDrop={(item) => {
              const dropDate = format(currentDate, 'yyyy-MM-dd');
              console.log('Dropped event:', item);
              console.log('Drop date:', dropDate);
              console.log('Current events:', events.map(e => ({ id: e.id, date: e.date })));
              const eventToUpdate = events.find((e) => e.id === item.id);
              if (eventToUpdate) {
                const updatedEvent = { ...eventToUpdate, date: dropDate };
                console.log('Updating event:', updatedEvent);
                moveEvent(item.id, dropDate);
              } else {
                console.log('Event not found for id:', item.id);
              }
            }}
          />
        );
      case 'week':
        return (
          <WeeklyView
            currentDate={currentDate}
            events={events}
            onDayClick={setSelectedDay}
            setShowForm={setShowForm}
            setEditingEvent={setEditingEvent}
            deleteEvent={deleteEvent}
          />
        );
      case 'day':
        return (
          <DailyView
            currentDate={currentDate}
            events={events}
            onDayClick={setSelectedDay}
            setShowForm={setShowForm}
            setEditingEvent={setEditingEvent}
            deleteEvent={deleteEvent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setView={setView}
          view={view}
        />
        {renderView()}
        {showForm && (
          <EventForm
            event={editingEvent || { date: selectedDay }}
            onSave={handleSaveEvent}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;