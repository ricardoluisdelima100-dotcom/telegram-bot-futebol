const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "SEU_TOKEN";
const CHAT_ID = "SEU_CHAT_ID";

// 🔢 FUNÇÃO QUE FALTAVA
function gerarOdd() {
  return (Math.random() * 3 + 1).toFixed(2);
}

// 📤 ENVIAR MENSAGEM
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

// 🔁 LOOP AUTOMÁTICO
setInterval(() => {
  const odd = gerarOdd();

  if (odd < 2.0) {
    console.log("🚫 Odd baixa, ignorando...");
    return;
  }

  const msg = `🔥 ALERTA TOP

⚽ Time A vs Time B
📈 Odd: ${odd}

💰 Entrada de valor!`;

  enviarMensagem(msg);
}, 60000);
