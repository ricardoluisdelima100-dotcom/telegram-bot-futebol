const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

async function enviarMensagem(texto) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: texto
      })
    });

    const data = await res.json();
    console.log("RESPOSTA:", data);
  } catch (err) {
    console.log("ERRO:", err);
  }
}

setInterval(() => {
  const msg = "🔥 BOT FUNCIONANDO PERFEITO!";
  enviarMensagem(msg);
}, 5000);
