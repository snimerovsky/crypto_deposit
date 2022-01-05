const { format } = require ('winston')
const { printf } = format;


export const logFormatConsole = printf(({ level, message }) => {
    return `${level}: ${message}`;
});
