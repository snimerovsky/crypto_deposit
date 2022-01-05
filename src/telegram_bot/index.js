import Crypto from "./crypto";
import {BOT_BUTTONS} from "../utils/messages";
const { Telegraf, session, Stage } = require("telegraf");

export default class TelegramBot {
  constructor(app) {
    this.app = app;
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.bot.catch(async (err) => {
      this.app.logger.error('[ERROR TELEGRAF]: ', err)
    })
    this.Crypto = new Crypto(this.app);
    this.stages = new Stage()
    this.initScenes(['Crypto'])
    this.init();
  }

  initScenes = (value_scenes) => {
    for (let value of value_scenes) {
      this[value].initStages(this.stages);
    }
  }

  init = async () => {
    return this.initBot();
  };

  initBot = () => {
    try {
      this.bot.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const response_time = new Date() - start;
        let user_chat;
        let user_text;
        if (ctx) {
          if (ctx.message) {
            user_chat = ctx.message.chat
            user_text = ctx.message.text;
          }
          else if (ctx.update) {
            if (ctx.update.callback_query) {
              user_chat = ctx.update.callback_query.message.chat
            }
          }
        }
        this.app.logger.info(`(Response Time: ${response_time}) ${user_chat ? `chat_id: ${user_chat.id}, first_name: ${user_chat.first_name}` : ''}
${user_text ? `Text: ${user_text}` : ''}`);
      });
      this.bot.use(session());
      this.bot.use(this.stages.middleware());
      return this.startBot();
    } catch (e) {
      this.app.logger.error(e.message, {
        function: 'initBot'
      })
    }
  };

  listenEvents = () => {
    this.bot.on("text", async (ctx) => {
      if (ctx.message.text === '/start') {
        return this.startBotMessage(ctx)
      }

      if (ctx.message.text === BOT_BUTTONS['deposit']) {
        return ctx.scene.enter('get_deposit')
      }
    })
  };

  startBot = async () => {
    try {
      this.app.logger.info('Bot is running...')
      this.bot.start(this.startBotMessage);
      this.listenEvents();
      await this.bot.launch();
    } catch (e) {
      this.app.logger.error(e.message, {
        function: 'startBot'
      })
    }
  };

  startBotMessage = (ctx) => {
    return this.Crypto.services.replyWelcome(ctx)
  }
}

