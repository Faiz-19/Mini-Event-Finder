import React from 'react';

const EventDetail = ({ event, onBack, onJoin, error }) => {
  if (!event) return null;

  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const progress = (event.currentParticipants / event.maxParticipants) * 100;
  const isFull = spotsLeft <= 0;

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700 text-indigo-300">
        {event.title}
      </h2>

      {/* Show error from App.jsx (e.g., "Event is full") */}
      {error && (
        <div className="mb-4 text-center text-red-400 bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex mb-3">
            <strong className="text-gray-400 font-semibold w-24">Location:</strong>
            <span className="text-gray-100">{event.location}</span>
          </div>
          <div className="flex mb-3">
            <strong className="text-gray-400 font-semibold w-24">Date:</strong>
            <span className="text-gray-100">{new Date(event.date).toLocaleDateString()}</span>
          </div>
        </div>
        <div>
          <p className="text-gray-400 mb-2">Participants:</p>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div 
              className="bg-indigo-500 h-4 rounded-full text-xs text-white flex items-center justify-center font-bold"
              style={{ width: `${progress}%` }}
            >
              {event.currentParticipants}
            </div>
          </div>
          <p className="text-sm text-gray-400 text-right">
            {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left of {event.maxParticipants}
          </p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">Description</h3>
      <p className="text-gray-300 leading-relaxed bg-gray-900 p-4 rounded-md">
        {event.description || 'No description provided.'}
      </p>

      {/* --- Action Buttons --- */}
      <div className="flex items-center gap-4 mt-8">
        <button 
          className="bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-600 transition" 
          onClick={onBack}
        >
          &larr; Back to List
        </button>

        <button 
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isFull 
              ? 'bg-red-500 text-white cursor-not-allowed' 
              : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500'
          }`}
          onClick={() => onJoin(event.id)}
          disabled={isFull}
        >
          {isFull ? 'Event Full' : 'Join Event'}
        </button>
      </div>
    </div>
  );
};

export default EventDetail;