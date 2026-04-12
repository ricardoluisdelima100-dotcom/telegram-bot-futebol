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

// ================= BUSCAR TODOS OS JOGOS DO DIA =================
async function buscarJogosDoDia() {
  try {
    const hoje = getDataHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${hoje}`
    );

    if (!data.events || data.events.length === 0) return [];

    // pega vários jogos (até 10)
    return data.events.slice(0, 10).map(ev => {
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
function gerarMensagem(listaJogos) {
  return `📅 JOGOS DE HOJE

${listaJogos.join("\n\n")}

🔥 Fique de olho nos melhores jogos para entrada!`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosDoDia();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo encontrado hoje.");
    return;
  }

  const mensagem = gerarMensagem(jogos);

  await enviarMensagem(mensagem);
}

// roda a cada 1 hora (melhor pra esse tipo)
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
