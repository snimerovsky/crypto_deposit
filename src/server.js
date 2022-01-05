import express from "express";
import http from "http";
import bodyParser from "body-parser";
import {createLogger, format, transports} from "winston";
import {logFormatConsole} from "./utils/functions";
import TelegramBot from "./telegram_bot";

export const createServer = () => {
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
