import io from 'socket.io-client';

const socket = io();

const subscribeToQuestionChanges = (action, cb) => {
  socket.on(`questions:${action}`, question => {
    cb(question);
  });
};

const publishQuestionChanges = (action, question) => {
  socket.emit(`questions:${action}`, question);
};

export default {
  subscribeToQuestionChanges,
  publishQuestionChanges,
};
