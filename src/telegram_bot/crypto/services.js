import {welcomeKeyboard} from "./keyboards";
import {BOT_MESSAGES} from "../../utils/messages";

export default class Services {
    constructor(app) {
        this.app = app;
    }

    replyWelcome = async (ctx) => {
        try {
            return ctx.reply(BOT_MESSAGES['welcome'],
                welcomeKeyboard().reply())
        } catch (e) {
            this.app.logger.error(e.message, {
                function: 'replyWelcome'
            })
        }
    }

    calculateDeposit = async (ctx, sum) => {

    }
}
