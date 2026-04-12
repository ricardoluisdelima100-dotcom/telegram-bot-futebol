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
    console.log("Mensagem enviada!");
  } catch (err) {
    console.log("Erro ao enviar:", err.message);
  }
}

// ================= JOGOS DO DIA =================
const jogosHoje = [
  {
    liga: "Brasileirão Série A",
    casa: "Botafogo",
    fora: "Coritiba",
    hora: "16:00"
  },
  {
    liga: "Brasileirão Série A",
    casa: "Fluminense",
    fora: "Flamengo",
    hora: "18:00"
  },
  {
    liga: "Brasileirão Série A",
    casa: "Cruzeiro",
    fora: "Bragantino",
    hora: "18:30"
  },
  {
    liga: "Brasileirão Série A",
    casa: "Corinthians",
    fora: "Palmeiras",
    hora: "18:30"
  }
];

// ================= MONTAR MENSAGEM =================
function montarMensagem(jogo) {
  return `🇧🇷 ${jogo.liga}

⚽ ${jogo.casa} vs ${jogo.fora}
🕒 ${jogo.hora}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT INICIADO");

  for (let jogo of jogosHoje) {
    await enviarMensagem(montarMensagem(jogo));
  }
}

// 🔥 roda a cada 1 minuto (pra testar)
setInterval(rodarBot, 60 * 1000);

// roda ao iniciar
rodarBot();
