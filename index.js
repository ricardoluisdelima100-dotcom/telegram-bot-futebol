const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

console.log("BOT ONLINE 🚀");

async function enviarMensagem() {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: "🔥 TESTE: BOT FUNCIONANDO!"
    })
  });
}

setInterval(() => {
  console.log("Enviando mensagem...");
  enviarMensagem();
}, 30000);
