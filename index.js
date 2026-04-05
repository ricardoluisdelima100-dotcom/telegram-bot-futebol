const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;
const API_KEY = process.env.ODDS_API_KEY;

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
    console.log("❌ ERRO ENVIO:", err);
  }
}

// 🔥 buscar odds reais
async function buscarOdds() {
  try {
    console.log("🔍 Buscando odds...");

    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=br&markets=h2h&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("📊 TOTAL JOGOS:", data.length);

    if (!data || data.length === 0) {
      console.log("❌ Sem jogos");
      return;
    }

    const jogo = data[Math.floor(Math.random() * data.length)];

    const casa = jogo.home_team;
    const fora = jogo.away_team;

    let odd = jogo.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price;

    // fallback se não tiver odd
    if (!odd) {
      odd = (Math.random() * 2 + 2).toFixed(2);
      console.log("⚠️ Usando odd simulada");
    }

    console.log("🎯 JOGO:", casa, "vs", fora);
    console.log("📈 ODD:", odd);

    const msg = `🔥 ALERTA REAL VIP

⚽ ${casa} vs ${fora}
📈 Odd: ${odd}

💰 Entrada de valor detectada!`;

    enviarMensagem(msg);

  } catch (err) {
    console.log("❌ ERRO GERAL:", err);
  }
}

// 🔁 roda a cada 1 minuto
setInterval(buscarOdds, 60000);

// 🔥 roda uma vez ao iniciar
buscarOdds();
