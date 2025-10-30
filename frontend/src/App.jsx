import React, { useState, useEffect } from "react";
import * as api from "./services/api";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import CreateEventForm from "./components/CreateEventForm";

function App() {
  const [view, setView] = useState("list"); // 'list', 'detail', 'create'
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch all events
  const fetchEvents = async (location = "") => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getEvents(location);
      setEvents(res.data);
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single event by ID
  const handleSelectEvent = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getEventById(id);
      setSelectedEvent(res.data);
      setView("detail");
    } catch (err) {
      setError("Failed to fetch event details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating a new event
  const handleCreateEvent = async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      await api.createEvent(eventData);
      setView("list"); // Go back to the list
      await fetchEvents(); // Refresh the list
    } catch (err) {
      setError("Failed to create event. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (id) => {
    try {
      setError(null);
      const res = await api.joinEvent(id);
      const updatedEvent = res.data;
      setSelectedEvent(updatedEvent); 
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to join event.';
      setError(message);
    }
  };

  // Handle the search/filter (Bonus)
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(search);
  };

  // Initial data load on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to render the correct view
  const renderView = () => {
    if (loading) {
      return <div className="text-center p-12 text-gray-400">Loading...</div>;
    }

    if (error && view !== "create") {
      return <div className="text-center p-12 text-red-400">{error}</div>;
    }

    switch (view) {
      case "detail":
        return (
          <EventDetail
            event={selectedEvent}
            onBack={() => setView("list")}
            onJoin={handleJoinEvent}
            error={error}
          />
        );
      case "create":
        return (
          <CreateEventForm
            onSubmit={handleCreateEvent}
            onBack={() => setView("list")}
            error={error}
          />
        );
      case "list":
      default:
        return (
          <>
            <form className="mb-8 flex gap-2" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Filter by location (e.g., Solapur)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Search
              </button>
            </form>
            <EventList events={events} onSelectEvent={handleSelectEvent} />
          </>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 pb-4 border-b border-gray-700">
        <h1 className="text-4xl font-bold text-indigo-400 mb-4 sm:mb-0">
          Event Finder
        </h1>
        {view === "list" && (
          <button
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-200"
            onClick={() => {
              setView("create");
              setError(null);
            }}
          >
            + Create Event
          </button>
        )}
      </header>
      <main>{renderView()}</main>
    </div>
  );
}

export default App;
