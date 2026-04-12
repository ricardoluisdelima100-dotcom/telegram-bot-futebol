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

// ================= BUSCAR JOGOS DO BRASIL =================
async function buscarJogosBrasil() {
  try {
    const hoje = getDataHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${hoje}`
    );

    if (!data.events) return [];

    return data.events.filter(ev => {
      return ev.tournament.category.name === "Brazil";
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

  return `🇧🇷 ${liga}

⚽ ${casa} vs ${fora}

🎯 PALPITES:

⚽ Gols: Over 1.5
🚩 Escanteios: Over 8.5
🟨 Cartões: Over 3.5

🔥 Entrada padrão para jogo equilibrado`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo do Brasil hoje.");
    return;
  }

  // envia só 3 jogos (evita spam)
  const selecionados = jogos.slice(0, 3);

  for (let jogo of selecionados) {
    const mensagem = gerarPalpite(jogo);
    await enviarMensagem(mensagem);
  }
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
