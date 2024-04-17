export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
});
