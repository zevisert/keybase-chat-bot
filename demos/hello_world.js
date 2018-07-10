#!/usr/bin/env node
// @flow
var Bot = require('../index.js').Bot

var bot = new Bot()

bot.init({verbose: false}, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Your bot is initialized. It is logged in as ' + bot.myInfo().username)

    var channel = {
      name: 'kbot,' + bot.myInfo().username,
      public: false,
      topic_type: 'chat',
    }

    var sendArg = {
      channel: channel,
      message: {
        body: 'Hello kbot! This is ' + bot.myInfo().username + ' saying hello from my device ' + bot.myInfo().devicename,
      },
    }

    bot.chatSend(sendArg, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Message sent!')
      }
    })
  }
})
