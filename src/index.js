import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { createLogger, format, transports } from 'winston'
import {logFormatConsole} from "./utils/functions";
import TelegramBot from "./telegram_bot";

require('dotenv').config()

const PORT = process.env.PORT;
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

app.server.listen(process.env.PORT || PORT, () => {
    app.logger.info(`App is running on port ${app.server.address().port}`);
});
