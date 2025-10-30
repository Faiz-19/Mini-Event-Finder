import React from 'react';

const EventDetail = ({ event, onBack }) => {
  if (!event) return null;

  const spotsLeft = event.maxParticipants - event.currentParticipants;
  const progress = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700 text-indigo-300">
        {event.title}
      </h2>

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

      <button 
        className="mt-8 bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-600 transition" 
        onClick={onBack}
      >
        &larr; Back to List
      </button>
    </div>
  );
};

export default EventDetail;