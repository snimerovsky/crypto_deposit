const BOT_MESSAGES = {
    'welcome': `👋 Привіт

📝 Сюди можна ввести свій місячний депозит і я порахую скільки потрібно інвестувати в криптовалюту кожної неділі. Дані отримую від Notion

🤝 Якщо є питання або пропозиція, ось мій розробник @snimerovsky`,
    'get_deposit': 'Введіть сумму ($):',
    'calculate_deposit_progress': 'Рахую...'
}

const BOT_BUTTONS = {
    'main': '🏠 Головна',
    'deposit': '💰 Депозит'
}

const MOMENT_SUNDAY_DAY = 0

module.exports = {BOT_MESSAGES, BOT_BUTTONS, MOMENT_SUNDAY_DAY}
