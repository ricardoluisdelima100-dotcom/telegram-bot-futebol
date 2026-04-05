const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// ⚽ lista de jogos realistas
const jogos = [
  ["Flamengo", "Palmeiras"],
  ["Corinthians", "São Paulo"],
  ["Grêmio", "Internacional"],
  ["Atlético-MG", "Cruzeiro"],
  ["Barcelona", "Real Madrid"],
  ["Manchester City", "Liverpool"]
];

// 📈 gerar odd
function gerarOdd() {
  return (Math.random() * 1.5 + 2.0).toFixed(2);
}

// ⏰ minuto realista
function gerarMinuto() {
  return Math.floor(Math.random() * 60) + 30;
}

// 📤 enviar mensagem
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
    console.log("📤 ENVIO:", data);

  } catch (err) {
    console.log("❌ ERRO:", err);
  }
}

// 🔥 loop principal
setInterval(() => {
  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const odd = gerarOdd();
  const minuto = gerarMinuto();

  const msg = `🔥 ALERTA VIP AO VIVO

⚽ ${jogo[0]} vs ${jogo[1]}
📈 Odd: ${odd}
⏰ ${minuto} min

💰 Entrada de valor detectada!

⚠️ Gestão: 5% da banca
📊 Confiança: ALTA`;

  console.log("📢 ENVIANDO:", msg);

  enviarMensagem(msg);

}, 60000);

// 🔥 roda na hora
setTimeout(() => {
  console.log("🚀 INICIANDO BOT...");
}, 1000);
