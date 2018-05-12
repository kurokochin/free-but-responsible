const TelegramBot = require('node-telegram-bot-api');
const BadMessage = require('./models/BadMessage');
const token = '578739332:AAG-iXHYs1Qpbw_IwLR00ZcaugbtNOh33aE';
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const validator = require('validator');
const badWord = require('./badWords');
sentiment.registerLanguage('sex', {
  labels: badWord
});
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  try {
    const chatId = msg.chat.id;
    var resultSexualHarrasment = sentiment.analyze(msg.text, { language: 'sex' }).score;
    var resultEnglish = sentiment.analyze(msg.text).score;
    if (resultEnglish < 0 || resultSexualHarrasment < 0) {
      BadMessage.create({
          from: validator.escape(msg.from.username),
          content: validator.escape(msg.text)
      });
      bot.sendMessage(chatId, 'I think that was inappropriate, please behave!');
    }
  } catch(err) {
    console.log(err);
  }
});