const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;
const Sentiment = require('sentiment');
const BadMessageController = require('./controllers/badMessageController');
const sentiment = new Sentiment();
const db = require('./db');
const validator = require('validator');
const app = express();
const BadMessage = require('./models/BadMessage');

const badWord = require('./badWords');
sentiment.registerLanguage('sex', {
  labels: badWord
});

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

app.use('/bad-messages/', BadMessageController);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

var server = app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});

io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function(data) {
        var resultSexualHarrasment = sentiment.analyze(data.content, { language: 'sex' }).score;
        var resultEnglish = sentiment.analyze(data.content).score;
        if (resultEnglish < 0 || resultSexualHarrasment < 0) {
          BadMessage.create({
              from: validator.escape(data.username),
              content: validator.escape(data.content)
          });
        }
        io.emit('RECEIVE_MESSAGE', data);
    })
});