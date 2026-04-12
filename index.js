import axios from "axios";

// ================= CONFIG =================
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// ================= SUA BASE (EDITA TODO DIA) =================
const jogosHoje = [
  {
    liga: "Brasileirão Série A",
    casa: "Cruzeiro",
    fora: "Red Bull Bragantino",
    hora: "18:30"
  },
  {
    liga: "Brasileirão Série A",
    casa: "Atlético-MG",
    fora: "Grêmio",
    hora: "19:00"
  },
  {
    liga: "Brasileirão Série B",
    casa: "Sport",
    fora: "Ceará",
    hora: "18:00"
  }
];

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

// ================= ANÁLISE SIMPLES =================
function gerarAnalise(jogo) {
  return {
    gols: "Over 1.5",
    escanteios: "Over 8.5",
    cartoes: "Over 3.5"
  };
}

// ================= MONTAR MENSAGEM =================
function montarMensagem(jogo) {
  const analise = gerarAnalise(jogo);

  return `🇧🇷 ${jogo.liga}

⚽ ${jogo.casa} vs ${jogo.fora}
🕒 ${jogo.hora}

🎯 PALPITES:

⚽ Gols: ${analise.gols}
🚩 Escanteios: ${analise.escanteios}
🟨 Cartões: ${analise.cartoes}

🔥 Entrada selecionada`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT ATIVO");

  for (let jogo of jogosHoje) {
    await enviarMensagem(montarMensagem(jogo));
  }
}

// roda ao iniciar
rodarBot();
