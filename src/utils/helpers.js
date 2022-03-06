const { format } = require ('winston')
const { printf } = format;


const logFormatConsole = printf(({ level, message }) => {
    return `${level}: ${message}`;
});

module.exports = {logFormatConsole}
