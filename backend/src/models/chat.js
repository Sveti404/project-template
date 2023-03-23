// Import the sequelize library
const Sequelize = require('sequelize');

// Import the sequelize instance which has been configured for SQLite
const sequelize = require('./sequelize');

// Initialize chat table with a required (not null)
// text field "message"
const Chat = sequelize.define('chats', {
  message: {
    // Message field is a string
    type: Sequelize.TEXT,
    // Disallows creating chat entries without a message
    allowNull: false,
  },
  nickname: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  room: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Export the Chat model
module.exports = Chat;
