import {BOT_BUTTONS} from "../../utils/messages";
const {Keyboard} = require('telegram-keyboard')

export const welcomeKeyboard = () => {
    return Keyboard.make([
            [BOT_BUTTONS['deposit']],
    ])
}

export const depositKeyboard = () => {
    return Keyboard.make([
        [BOT_BUTTONS['main']],
        [BOT_BUTTONS['deposit']],
    ])
}
