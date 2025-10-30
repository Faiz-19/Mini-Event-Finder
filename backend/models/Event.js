import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  maxParticipants: { type: Number, required: true, min: 1 },
  currentParticipants: { type: Number, default: 0 },
});

// This transforms the output to match what the frontend expects
// It renames '_id' to 'id' and removes the '__v' field.
eventSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
