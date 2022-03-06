const {createServer} = require( "../../server");
const axios = require( 'axios')
jest.mock('axios');

const app = createServer()

describe('crypto', function() {
    beforeEach(() => {
        const notionData = {
            "results": [
                {
                    "properties": {
                        "% в портфелі": {
                            "id": "ctPl",
                            "type": "number",
                            "number": 0.5
                        },
                        "Назва": {
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Bitcoin",
                                        "link": null
                                    },
                                }
                            ]
                        },
                        "Символ": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "BTC"
                                    }
                                }
                            ]
                        },
                        "Колір": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "color"
                                    }
                                }
                            ]
                        },
                    },
                },
                {
                    "properties": {
                        "% в портфелі": {
                            "id": "ctPl",
                            "type": "number",
                            "number": 0.4
                        },
                        "Назва": {
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Ethereum",
                                        "link": null
                                    },
                                }
                            ]
                        },
                        "Символ": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "ETH"
                                    }
                                }
                            ]
                        },
                        "Колір": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "color"
                                    }
                                }
                            ]
                        },
                    },
                },
                {
                    "properties": {
                        "% в портфелі": {
                            "id": "ctPl",
                            "type": "number",
                            "number": 0.1
                        },
                        "Назва": {
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "XML",
                                        "link": null
                                    },
                                }
                            ]
                        },
                        "Символ": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "XML"
                                    }
                                }
                            ]
                        },
                        "Колір": {
                            "rich_text": [
                                {
                                    "text": {
                                        "content": "color"
                                    }
                                }
                            ]
                        },
                    },
                },
            ],
        }

        axios.post.mockResolvedValueOnce({
            data: notionData
        });
    })

    it('calculate deposit on Jan', async () => {
        const notion_data = await app.bot.Crypto.services.getNotionCryptoData()

        let res = await app.bot.Crypto.services.calculateDeposit(notion_data, 700, '2022-01-05')
        expect(res).toEqual(`✅ Дані на 05.01.2022:

В місяць ви можете інвестувати <b>140$</b> (20%)

З них кожної неділі (цього місяця їх 5) потрібно інвестувати в:

Bitcoin: 14.0$
-----------
Ethereum: 11.2$
-----------
XML: 2.8$

Детальну інформацію про кожну валюту можна дізнатись <a href="${process.env.NOTION_PAGE}">тут</a>`)
    })

    it('calculate deposit on Feb', async () => {
        const notion_data = await app.bot.Crypto.services.getNotionCryptoData()

        let res = await app.bot.Crypto.services.calculateDeposit(notion_data, 1000, '2022-02-05')
        expect(res).toEqual(`✅ Дані на 05.02.2022:

В місяць ви можете інвестувати <b>200$</b> (20%)

З них кожної неділі (цього місяця їх 4) потрібно інвестувати в:

Bitcoin: 25.0$
-----------
Ethereum: 20.0$
-----------
XML: 5.0$

Детальну інформацію про кожну валюту можна дізнатись <a href="${process.env.NOTION_PAGE}">тут</a>`)
    })
})
