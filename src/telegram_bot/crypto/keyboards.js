const {BOT_BUTTONS} = require ("../../utils/messages");
const {Keyboard} = require('telegram-keyboard')

const welcomeKeyboard = () => {
    return Keyboard.make([
            [BOT_BUTTONS['deposit']],
    ])
}

const depositKeyboard = () => {
    return Keyboard.make([
        [BOT_BUTTONS['main']],
        [BOT_BUTTONS['deposit']],
    ])
}

module.exports = {welcomeKeyboard, depositKeyboard}
