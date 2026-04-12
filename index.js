import axios from "axios";

// ================= CONFIG =================
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// ================= TELEGRAM =================
async function enviarMensagem(texto) {
  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: texto,
    });
  } catch (err) {
    console.log("Erro ao enviar mensagem:", err.message);
  }
}

// ================= DATA =================
function getTimestampHoje() {
  const hoje = new Date();
  return Math.floor(hoje.getTime() / 1000);
}

// ================= BUSCAR JOGOS DO DIA (FUNCIONA MELHOR) =================
async function buscarJogosDoDia() {
  try {
    const timestamp = getTimestampHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${timestamp}`
    );

    if (!data.events || data.events.length === 0) return [];

    return data.events.slice(0, 5).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro jogos do dia:", err.message);
    return [];
  }
}

// ================= BUSCAR AO VIVO =================
async function buscarJogosAoVivo() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events/live"
    );

    if (!data.events || data.events.length === 0) return [];

    return data.events.slice(0, 2).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro ao vivo:", err.message);
    return [];
  }
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo, tipo) {
  return `🎯 ${tipo}

⚽ ${jogo}

📊 Sugestões:
- Over 1.5 gols
- Over 8.5 escanteios
- Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const aoVivo = await buscarJogosAoVivo();
  let doDia = await buscarJogosDoDia();

  // fallback (nunca ficar vazio)
  if (doDia.length === 0) {
    doDia = [
      "Flamengo vs Palmeiras",
      "Barcelona vs Real Madrid"
    ];
  }

  // AO VIVO
  if (aoVivo.length > 0) {
    for (let jogo of aoVivo) {
      await enviarMensagem(gerarMensagem(jogo, "🔥 AO VIVO"));
    }
  }

  // DO DIA
  for (let jogo of doDia) {
    await enviarMensagem(gerarMensagem(jogo, "📅 JOGOS DO DIA"));
  }
}

// roda a cada 10 minutos
setInterval(rodarBot, 10 * 60 * 1000);

// roda ao iniciar
rodarBot();
