export default class Services {
    constructor(app) {
        this.app = app;
    }

    replyWelcome = async (ctx) => {
        try {
            return ctx.reply(`👋 Привіт

📝 Сюди можна ввести свій місячний депозит і я вирухую скільки потрібно інвестувати в кожну криптовалюту кожної неділі`,
                Extra.HTML())
        } catch (e) {
            this.app.logger.error(e.message, {
                function: 'replyWelcome'
            })
        }
    }
}
