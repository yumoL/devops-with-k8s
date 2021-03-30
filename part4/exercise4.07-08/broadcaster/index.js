require('dotenv').config();
const NATS = require('nats')
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
const chatId = process.env.CHAT_ID

const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://nats:4222',
  json: true
})


nc.subscribe('todo_list', { queue: 'todo.workers' }, async (todoMsg) => {
  // console.log(JSON.stringify(todoMsg))
  // console.log(chatId)
  await bot.telegram.sendMessage(chatId, JSON.stringify(todoMsg))

})