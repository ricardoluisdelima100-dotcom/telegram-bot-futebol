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

// ================= SUA BASE REAL (EDITA TODO DIA) =================
const jogosHoje = [
  "Atlético-MG vs Grêmio - 19:00",
  "Fluminense vs Corinthians - 21:30",
  "Sport vs Ceará - 18:00",
  "Vila Nova vs Avaí - 20:00"
];

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo) {
  return `🇧🇷 JOGO DO DIA

⚽ ${jogo}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões

🔥 Boa oportunidade de entrada`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT ATIVO");

  for (let jogo of jogosHoje) {
    await enviarMensagem(gerarMensagem(jogo));
  }
}

// roda 1x ao iniciar
rodarBot();
