const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// 🎲 times aleatórios
const jogos = [
  ["Flamengo", "Palmeiras"],
  ["Barcelona", "Real Madrid"],
  ["Manchester City", "Liverpool"],
  ["PSG", "Bayern"],
  ["Juventus", "Milan"]
];

// 🎲 gerar odd
function gerarOdd() {
  return (Math.random() * 2 + 1.5).toFixed(2);
}

// 🎲 gerar minuto
function gerarMinuto() {
  return Math.floor(Math.random() * 90) + 1;
}

// 📤 enviar mensagem
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

// 🔥 LOOP PRINCIPAL
setInterval(() => {
  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const odd = gerarOdd();
  const minuto = gerarMinuto();

  // 🧠 filtro inteligente
  if (odd < 2.0) return;

  const msg = `🔥 ALERTA AO VIVO

⚽ ${jogo[0]} vs ${jogo[1]}
📈 Odd: ${odd}
⏰ ${minuto} min

💰 Entrada de valor detectada!`;

  enviarMensagem(msg);

}, 60000);
