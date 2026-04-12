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

// ================= SUA "API" (VOCÊ CONTROLA) =================
const jogosHoje = [
  {
    liga: "Brasileirão Série A",
    jogo: "Atlético-MG vs Grêmio",
    hora: "19:00"
  },
  {
    liga: "Brasileirão Série A",
    jogo: "Fluminense vs Corinthians",
    hora: "21:30"
  },
  {
    liga: "Brasileirão Série B",
    jogo: "Sport vs Ceará",
    hora: "18:00"
  }
];

// ================= GERAR PALPITE =================
function gerarMensagem(jogo) {
  return `🇧🇷 ${jogo.liga}

⚽ ${jogo.jogo}
🕒 ${jogo.hora}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões

🔥 Análise baseada em padrão ofensivo`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT ATIVO");

  for (let jogo of jogosHoje) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

// roda 1 vez ao iniciar
rodarBot();
