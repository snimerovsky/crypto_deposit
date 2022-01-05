import {createServer} from "../../server";
import axios from 'axios'
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
                        }
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
                        }
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
                        }
                    },
                },
            ],
        }

        axios.post.mockResolvedValueOnce({
            data: notionData
        });
    })

    it('calculate deposit on Jan', async () => {
        let res = await app.bot.Crypto.services.calculateDeposit(700, '2022-01-05')
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
        let res = await app.bot.Crypto.services.calculateDeposit(1000, '2022-02-05')
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
