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

// ================= DATA HOJE =================
function getDataHoje() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

// ================= BUSCAR JOGOS BRASIL =================
async function buscarJogosBrasil() {
  try {
    const hoje = getDataHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${hoje}`
    );

    if (!data.events || data.events.length === 0) return [];

    // FILTRAR SÓ BRASIL (SÉRIE A E B)
    const jogosBrasil = data.events.filter(ev => {
      const liga = ev.tournament.name.toLowerCase();

      return (
        liga.includes("brasileiro") ||
        liga.includes("serie a") ||
        liga.includes("serie b") ||
        liga.includes("brazil")
      );
    });

    return jogosBrasil.map(ev => {
      const casa = ev.homeTeam.name;
      const fora = ev.awayTeam.name;
      const liga = ev.tournament.name;

      return `🏆 ${liga}\n⚽ ${casa} vs ${fora}`;
    });

  } catch (err) {
    console.log("Erro ao buscar jogos:", err.message);
    return [];
  }
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogos) {
  return `🇧🇷 JOGOS DO BRASIL HOJE

${jogos.join("\n\n")}

🔥 Série A e Série B`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil hoje.");
    return;
  }

  await enviarMensagem(gerarMensagem(jogos));
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
