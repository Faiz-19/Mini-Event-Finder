import React, { useState } from 'react';

const CreateEventForm = ({ onSubmit, onBack, error }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-700" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700 text-indigo-300">
        Create a New Event
      </h2>

      {error && <div className="mb-4 text-center text-red-400">{error}</div>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Event Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-300 mb-2">Max Participants *</label>
        <input
          type="number"
          id="maxParticipants"
          name="maxParticipants"
          value={formData.maxParticipants}
          onChange={handleChange}
          min="1"
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex gap-4 mt-8">
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-200">
          Create Event
        </button>
        <button 
          type="button" 
          className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition" 
          onClick={onBack}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;