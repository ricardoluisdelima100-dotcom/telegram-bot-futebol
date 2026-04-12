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

// ================= VERIFICAR SE É HOJE =================
function ehHoje(timestamp) {
  const hoje = new Date();
  const dataJogo = new Date(timestamp * 1000);

  return (
    dataJogo.getDate() === hoje.getDate() &&
    dataJogo.getMonth() === hoje.getMonth() &&
    dataJogo.getFullYear() === hoje.getFullYear()
  );
}

// ================= BUSCAR JOGOS BRASIL (CORRETO) =================
async function buscarJogosBrasil() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events"
    );

    if (!data.events) return [];

    return data.events.filter(ev => {
      // 🇧🇷 Brasil
      if (ev.tournament.category.name !== "Brazil") return false;

      // 📅 hoje
      if (!ehHoje(ev.startTimestamp)) return false;

      // ❌ não finalizado
      if (ev.status?.type === "finished") return false;

      return true;
    });

  } catch (err) {
    console.log("Erro ao buscar jogos:", err.message);
    return [];
  }
}

// ================= GERAR PALPITE =================
function gerarPalpite(jogo) {
  const casa = jogo.homeTeam.name;
  const fora = jogo.awayTeam.name;
  const liga = jogo.tournament.name;

  const horario = new Date(jogo.startTimestamp * 1000)
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

  return `🇧🇷 ${liga}

⚽ ${casa} vs ${fora}
🕒 ${horario}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil hoje.");
    return;
  }

  const selecionados = jogos.slice(0, 4);

  for (let jogo of selecionados) {
    await enviarMensagem(gerarPalpite(jogo));
  }
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
