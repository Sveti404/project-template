// Import the database module which contains the models
const database = require('../database');

// Lists Chat entries in the database and returns them
// in the response body with status code 200
exports.list = async (ctx) => {
  let options = {};
  let chats = "No chats found";
  if (ctx.params.room) {
    options = {where: {room: ctx.params.room}};
    chats = await database.Chat.findAll(options);
  } else {
    chats = await database.Chat.findAll(options);
  }

  const response = {
    results: chats,
  };

  ctx.body = response;
};

// Creates a Chat entry in the database and returns it
// in the response body with status code 201.
// Fails with 500 if message was not provided
exports.create = async (ctx) => {
  const { body } = ctx.request;

  const { message, nickname, room } = body;

  const chat = await database.Chat.create({ message, nickname, room });

  ctx.body = chat;
  ctx.status = 201;
};
