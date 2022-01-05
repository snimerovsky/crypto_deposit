const WizardScene = require("telegraf/scenes/wizard");

export default class Scenes {
    constructor(app) {
        this.app = app;
    }

    getDeposit = new WizardScene(
        'get_deposit',
        async (ctx) => {


            return ctx.wizard.next();
        },
        async (ctx) => {
            try {
                await this.checkForCommands(ctx);



            } catch (e) {
                console.log('error getPrepareInstitutionTime', e.message)
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
