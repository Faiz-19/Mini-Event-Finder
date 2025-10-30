import React from 'react';

// A single event card
const EventCard = ({ event, onSelectEvent }) => (
  <div 
    className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 cursor-pointer hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300" 
    onClick={() => onSelectEvent(event.id)}
  >
    <h3 className="text-2xl font-semibold text-indigo-300 mb-2">{event.title}</h3>
    <p className="text-gray-400 mb-1">
      <strong>Location:</strong> {event.location}
    </p>
    <p className="text-gray-400 mb-3">
      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
    </p>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-indigo-500 h-2.5 rounded-full" 
        style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
      ></div>
    </div>
    <p className="text-right text-sm text-gray-400 mt-2">
      {event.currentParticipants} / {event.maxParticipants} spots filled
    </p>
  </div>
);

// The list of all event cards
const EventList = ({ events, onSelectEvent }) => {
  if (events.length === 0) {
    return <div className="text-center p-12 text-gray-400">No events found.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onSelectEvent={onSelectEvent}
        />
      ))}
    </div>
  );
};

export default EventList;