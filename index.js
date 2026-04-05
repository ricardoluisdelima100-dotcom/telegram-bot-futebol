const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;
const API_KEY = process.env.ODDS_API_KEY;

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

// 🔥 buscar odds reais
async function buscarOdds() {
  try {
    console.log("🔍 Buscando odds reais...");

    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=br&markets=h2h&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      console.log("❌ Sem jogos disponíveis");
      return;
    }

    const jogo = data[Math.floor(Math.random() * data.length)];

    const casa = jogo.home_team;
    const fora = jogo.away_team;

    // pega odd da primeira casa
    const odd = jogo.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price;

    if (!odd || odd < 2.0) return;

    const msg = `🔥 ALERTA REAL VIP

⚽ ${casa} vs ${fora}
📈 Odd: ${odd}

💰 Entrada de valor REAL detectada!`;

    enviarMensagem(msg);

  } catch (err) {
    console.log("ERRO:", err);
  }
}

// 🔁 roda automático
setInterval(buscarOdds, 60000);
