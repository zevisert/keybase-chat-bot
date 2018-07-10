#!/usr/bin/env node
// @flow
const Bot = require('../index.js').Bot
const mathjs = require('mathjs')

const bot = new Bot()

//
// This bot replies to any message from any user,
// starting with `/math` (in any channel)
// by actually trying to do the math. For example
// send it :
//
//          /math sqrt(pi/2) * 3!`
//

// -----------------------------------------------------------------------------

const msgReply = (s) => {
  const calc = mathjs['eval']
  let ans
  try {
    ans = '= ' + calc(s).toString()
  } catch (error) {
    let [a1, a2, b1, b2] =
      [...Array(4)]
      .map(Math.random)
      .map(v => v * 10)
      .map(Math.floor)
    let eqn = `(${a1} + ${b1}i) * (${a2} + ${b2}i)`
    ans = `Sorry, I can't do that math. But did you know ${eqn} = ${calc(eqn).toString()}?`
  }
  return ans
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

bot.init(null, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('I am me! ', bot.myInfo().username, bot.myInfo().devicename)
    const onMessages = (o) => {
      for (let m of o.messages) {
        const prefix = m.msg.content.text.body.slice(0, 6)
        console.log(prefix)
        if (prefix === '/math ') {
          const reply = {
            body: msgReply(m.msg.content.text.body.slice(6)),
          }
          bot.chatSend({channel: o.channel, message: reply}, (err, res) => {
            if (err) {
              console.log(err)
            }
          })
        }
      }
    }

    console.log('Beginning watch for new messages.')
    console.log('Tell anyone to send a message to ' + bot.myInfo().username + ' starting with /math')
    bot.watchAllChannelsForNewMessages({onMessages: onMessages})
  }
})

