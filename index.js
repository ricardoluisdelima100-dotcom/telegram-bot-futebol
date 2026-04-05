const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "
8793955195:AAEdaFBHplh4LR9102R1yK3BSd2oywiSxrQ";
const CHAT_ID = " 5167844978";

async function enviarMensagem(texto) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: texto
    })
  });
}

// 🔥 TESTE FORÇADO
setInterval(() => {
  const msg = `🔥 TESTE FUNCIONANDO

Se você recebeu isso, deu certo!`;

  enviarMensagem(msg);
}, 5000);
