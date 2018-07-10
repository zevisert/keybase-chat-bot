#!/usr/bin/env node
// @flow
const Bot = require('../index.js').Bot

const bot = new Bot()

bot.init({verbose: false}, (err) => {
  if (!err) {
    bot.chatList(null, (err, res) => {
      if (!err) {
        console.log(res.conversations)
        const unreadCount = res.conversations.reduce((sum, convo) => (sum += convo.unread ? 1 : 0), 0)
        console.log(`You have ${unreadCount} unread conversations out of ${res.conversations.length} total.`)
      }
    })
  }
})
