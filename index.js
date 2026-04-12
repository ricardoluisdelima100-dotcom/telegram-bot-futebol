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
function getDataHoje() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

// ================= BUSCAR JOGOS DO BRASIL (CORRIGIDO) =================
async function buscarJogosBrasil() {
  try {
    const hoje = getDataHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${hoje}`
    );

    if (!data.events) return [];

    // 🔥 FILTRO CORRETO: país BRASIL
    const jogosBrasil = data.events.filter(ev => {
      return ev.tournament.category.name === "Brazil";
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

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil hoje.");
    return;
  }

  await enviarMensagem(`🇧🇷 JOGOS DO BRASIL HOJE\n\n${jogos.join("\n\n")}`);
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
