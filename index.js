const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

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

// 📈 gerar odd inteligente
function gerarOdd() {
  return (Math.random() * 1.5 + 1.9).toFixed(2);
}

// 🔥 buscar jogos futuros BR
async function buscarJogos() {
  try {
    console.log("🔍 Buscando jogos brasileiros...");

    const res = await fetch("https://www.openligadb.de/api/getmatchdata/bl1");
    const data = await res.json();

    if (!data || data.length === 0) {
      console.log("❌ Sem jogos");
      return;
    }

    const jogo = data[Math.floor(Math.random() * data.length)];

    const casa = jogo.team1.teamName;
    const fora = jogo.team2.teamName;
    const dataJogo = jogo.matchDateTime;

    const odd = gerarOdd();

    if (odd < 2.1) return;

    const msg = `🔥 ALERTA PRÉ-JOGO

⚽ ${casa} vs ${fora}
📅 ${new Date(dataJogo).toLocaleString()}
📈 Odd: ${odd}

💰 Entrada antecipada de valor!`;

    enviarMensagem(msg);

  } catch (err) {
    console.log("ERRO:", err);
  }
}

// 🔁 rodar automático
setInterval(buscarJogos, 60000);
