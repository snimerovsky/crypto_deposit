const express = require("express");
const http = require("http");
const bodyParser = require ("body-parser");
const {createLogger, format, transports} = require ("winston");
const {logFormatConsole} = require ("./utils/helpers");
const TelegramBot = require("./telegram_bot");

const createServer = () => {
    const app = express();
    app.server = http.createServer(app);

    app.use(bodyParser.json());

    app.logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json(),
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple(),
                    logFormatConsole
                ),
            })
        ],
    });

    app.logger.add(new transports.File({
        filename: 'logs/errors.log',
        level: 'error'
    }));

    app.bot = new TelegramBot(app);

    return app
}

module.exports = {createServer}
