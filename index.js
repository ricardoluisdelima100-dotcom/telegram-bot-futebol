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
    console.log("Erro Telegram:", err.message);
  }
}

// ================= PEGAR LIGAS DO BRASIL =================
async function buscarLigasBrasil() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/unique-tournament/325/events/last/0"
    );

    return data.events || [];
  } catch (err) {
    console.log("Erro liga:", err.message);
    return [];
  }
}

// ================= PEGAR JOGOS DO DIA =================
async function buscarJogosBrasilHoje() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events"
    );

    if (!data.events) return [];

    const hoje = new Date();

    return data.events.filter(ev => {
      const dataJogo = new Date(ev.startTimestamp * 1000);

      const ehHoje =
        dataJogo.getDate() === hoje.getDate() &&
        dataJogo.getMonth() === hoje.getMonth();

      const ehBrasil =
        ev.tournament.category.name === "Brazil";

      return ehHoje && ehBrasil;
    });

  } catch (err) {
    console.log("Erro jogos:", err.message);
    return [];
  }
}

// ================= GERAR PALPITE =================
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

  const jogos = await buscarJogosBrasilHoje();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo encontrado hoje.");
    return;
  }

  const selecionados = jogos.slice(0, 4);

  for (let jogo of selecionados) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

setInterval(rodarBot, 60 * 60 * 1000);
rodarBot();
