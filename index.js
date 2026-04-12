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

// ================= BUSCAR JOGOS REAIS =================
async function buscarJogosBrasil() {
  try {
    const { data } = await axios.get(
      "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?s=Soccer&d=2026-04-12"
    );

    if (!data.events) return [];

    return data.events.filter(ev => {
      return ev.strLeague.includes("Brazil");
    });

  } catch (err) {
    console.log("Erro API:", err.message);
    return [];
  }
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo) {
  return `🇧🇷 ${jogo.strLeague}

⚽ ${jogo.strHomeTeam} vs ${jogo.strAwayTeam}
🕒 ${jogo.strTime}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT ATIVO");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil encontrado hoje.");
    return;
  }

  for (let jogo of jogos.slice(0, 4)) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

rodarBot();
