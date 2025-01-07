const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean, 
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetails',
    required: true
  }
}, {
  timestamps: true
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Task = mongoose.model('Tasks', TaskSchema);
const User = mongoose.model('Userdetails', UserSchema);

module.exports = { Task, User };
