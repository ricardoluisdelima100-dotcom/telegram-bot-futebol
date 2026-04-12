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
    console.log("Erro:", err.message);
  }
}

// ================= DATA HOJE =================
function getDataHoje() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

// ================= BUSCAR JOGOS REAIS =================
async function buscarJogosBrasil() {
  try {
    const dataHoje = getDataHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/events/${dataHoje}`
    );

    if (!data.events) return [];

    return data.events.filter(ev => {
      return ev.tournament.category.name === "Brazil";
    });

  } catch (err) {
    console.log("Erro API:", err.message);
    return [];
  }
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo) {
  const casa = jogo.homeTeam.name;
  const fora = jogo.awayTeam.name;
  const liga = jogo.tournament.name;

  const hora = new Date(jogo.startTimestamp * 1000)
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

  return `🇧🇷 ${liga}

⚽ ${casa} vs ${fora}
🕒 ${hora}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil hoje.");
    return;
  }

  for (let jogo of jogos.slice(0, 5)) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

setInterval(rodarBot, 60 * 60 * 1000);
rodarBot();
