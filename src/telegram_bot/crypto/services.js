const {depositKeyboard, welcomeKeyboard} = require( "./keyboards");
const {BOT_MESSAGES, MOMENT_SUNDAY_DAY} = require( "../../utils/messages");
const axiosOriginal = require( 'axios')
const adapter = require( 'axios/lib/adapters/http')
const moment = require( "moment");

let axios

if (process.env.NODE_ENV === 'prod') {
    axios = axiosOriginal.create({ adapter })
} else {
    axios = axiosOriginal
}

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

    replyCalculateDeposit = async (ctx, sum) => {
        try {
            await ctx.reply(BOT_MESSAGES['calculate_deposit_progress'])

            const text = await this.calculateDeposit(sum, moment().format('YYYY-MM-DD'))

            return ctx.reply(text, depositKeyboard().reply({
                parse_mode: 'HTML',
                disable_web_page_preview: true
            }))
        }
        catch (e) {
            await ctx.reply(`Виникла помилка: ${e.message}`)
            this.app.logger.error(`Error at calculateDeposit: ${e.message}`)
        }
    }

    calculateDeposit = async (sum, date) => {
        const month_sum = sum * process.env.PERCENT_OF_SUM / 100
        const sundays_in_month = this.getAmountOfWeekDaysInMonth(moment(date), MOMENT_SUNDAY_DAY)
        sum = Math.floor((month_sum) / sundays_in_month)

        const data = await this.getNotionCryptoData()
        const today_date = moment(date).format('DD.MM.YYYY')

        const text = `✅ Дані на ${today_date}:

В місяць ви можете інвестувати <b>${month_sum}$</b> (${process.env.PERCENT_OF_SUM}%)

З них кожної неділі (цього місяця їх ${sundays_in_month}) потрібно інвестувати в:

${Object.keys(data).map(key => {
            return `${key}: ${(data[key] * sum).toFixed(1)}$`
        }).join(`
-----------
`)}

Детальну інформацію про кожну валюту можна дізнатись <a href="${process.env.NOTION_PAGE}">тут</a>`

        return text
    }

    getNotionCryptoData = async () => {
        const notion_data = {}

        let res = await axios.post(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {}, {
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_SECRET_KEY}`,
                'Notion-Version': process.env.NOTION_VERSION
            }
        })

        res = res['data']['results']

        for (let data of res) {
            if (data['properties'][process.env.NOTION_DATABASE_TITLE]['title'].length > 0) {
                if (data['properties'][process.env.NOTION_DATABASE_PERCENT]) {
                    notion_data[data['properties'][process.env.NOTION_DATABASE_TITLE]['title'][0]['text']['content']] = data['properties'][process.env.NOTION_DATABASE_PERCENT]['number']
                }
            }
        }

        return notion_data
    }

    getAmountOfWeekDaysInMonth = (date, weekday) => {
        date.date(1);
        const dif = (7 + (weekday - date.weekday()))%7+1;
        return Math.floor((date.daysInMonth()-dif) / 7)+1;
    }
}
