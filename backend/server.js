import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db.js';
import Event from './models/Event.js';

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// --- REST API Endpoints (with MongoDB) ---

// 1. GET /api/events - List all events (with optional location filter)
app.get('/api/events', async (req, res) => {
  const { location } = req.query;
  const filter = {};

  if (location) {
    // Use a regex for case-insensitive partial matching
    filter.location = { $regex: location, $options: 'i' };
  }

  try {
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// 2. GET /api/events/:id - Get event details
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});
//3. POST /api/events/:id/join - Join an event
app.post('/api/events/:id/join', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is already full' });
    }

    event.currentParticipants += 1;
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error joining event', error });
  }
});


// 4. POST /api/events - Create an event
app.post('/api/events', async (req, res) => {
  const { title, description, location, date, maxParticipants } = req.body;

  // Basic validation
  if (!title || !location || !date || !maxParticipants) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      maxParticipants: parseInt(maxParticipants, 10),
      currentParticipants: 0
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});