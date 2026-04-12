import axios from "axios";

// ================= CONFIG =================
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// IDs DAS LIGAS 🇧🇷
const LIGAS = [325, 390]; // Série A e Série B

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

// ================= BUSCAR JOGOS POR LIGA =================
async function buscarJogosLiga(idLiga) {
  try {
    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/unique-tournament/${idLiga}/events/round/1`
    );

    return data.events || [];
  } catch (err) {
    console.log("Erro liga:", err.message);
    return [];
  }
}

// ================= FILTRAR SÓ HOJE =================
function filtrarHoje(jogos) {
  const hoje = new Date();

  return jogos.filter(ev => {
    const dataJogo = new Date(ev.startTimestamp * 1000);

    return (
      dataJogo.getDate() === hoje.getDate() &&
      dataJogo.getMonth() === hoje.getMonth()
    );
  });
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo) {
  const casa = jogo.homeTeam.name;
  const fora = jogo.awayTeam.name;

  const hora = new Date(jogo.startTimestamp * 1000)
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

  return `🇧🇷 ${casa} vs ${fora}
🕒 ${hora}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO");

  let todosJogos = [];

  for (let liga of LIGAS) {
    const jogos = await buscarJogosLiga(liga);
    todosJogos.push(...jogos);
  }

  const jogosHoje = filtrarHoje(todosJogos);

  if (jogosHoje.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasileirão hoje.");
    return;
  }

  for (let jogo of jogosHoje.slice(0, 5)) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
