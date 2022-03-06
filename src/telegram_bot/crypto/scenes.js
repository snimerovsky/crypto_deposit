const {BOT_MESSAGES} = require( "../../utils/messages");

const WizardScene = require("telegraf/scenes/wizard");

module.exports = class Scenes {
    constructor(app) {
        this.app = app;
    }

    getDeposit = new WizardScene(
        'get_deposit',
        async (ctx) => {
            await ctx.reply(BOT_MESSAGES['get_deposit'], {reply_markup: {remove_keyboard: true}})

            return ctx.wizard.next();
        },
        async (ctx) => {
            try {
                await this.checkForCommands(ctx);

                const sum = ctx.update.message.text

                if (+sum) {
                    await ctx.scene.leave();

                    return this.app.bot.Crypto.services.replyCalculateDeposit(ctx, +sum)
                }

                return ctx.scene.reenter();

            } catch (e) {
                console.log('error getDeposit', e.message)
                return ctx.scene.leave();
            }
        }
    )

    scenes = [
        this.getDeposit,
    ]

    checkForCommands = async (ctx) => {
        try {
            const message = ctx.update.message

            if (message) {
                if (message.text) {
                    if (message.text.startsWith("/start")) {
                        await ctx.scene.leave();
                        return this.app.bot.startBotMessage(ctx);
                    }
                }
            }
        } catch (e) {
            console.log('error checkForCommands', e.message)
        }
    };
}
