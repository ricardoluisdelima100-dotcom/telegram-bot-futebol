const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

async function enviarMensagem() {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: "🔥 BOT RODANDO AUTOMÁTICO"
    })
  });
}

setInterval(() => {
  enviarMensagem();
}, 5000); // 👈 TEM QUE TER ESSE )
