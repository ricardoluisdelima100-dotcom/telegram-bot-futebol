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

// ================= DATA CORRETA =================
function getDataFormatada() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// ================= BUSCAR JOGOS DO DIA (CORRETO) =================
async function buscarJogosDoDia() {
  try {
    const dataHoje = getDataFormatada();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${dataHoje}`
    );

    if (!data.events || data.events.length === 0) return [];

    return data.events.slice(0, 5).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro jogos do dia:", err.message);
    return [];
  }
}

// ================= BUSCAR AO VIVO =================
async function buscarJogosAoVivo() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events/live"
    );

    if (!data.events || data.events.length === 0) return [];

    return data.events.slice(0, 2).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro ao vivo:", err.message);
    return [];
  }
}

// ================= GERAR MENSAGEM =================
function gerarMensagem(jogo, tipo) {
  return `🎯 ${tipo}

⚽ ${jogo}

📊 Sugestões:
- Over 1.5 gols
- Over 8.5 escanteios
- Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const aoVivo = await buscarJogosAoVivo();
  const doDia = await buscarJogosDoDia();

  // AO VIVO
  if (aoVivo.length > 0) {
    for (let jogo of aoVivo) {
      await enviarMensagem(gerarMensagem(jogo, "🔥 AO VIVO"));
    }
  } else {
    await enviarMensagem("⚠️ Nenhum jogo ao vivo agora.");
  }

  // DO DIA
  if (doDia.length > 0) {
    for (let jogo of doDia) {
      await enviarMensagem(gerarMensagem(jogo, "📅 JOGOS DE HOJE"));
    }
  } else {
    await enviarMensagem("⚠️ Nenhum jogo encontrado para hoje.");
  }
}

// roda a cada 10 minutos
setInterval(rodarBot, 10 * 60 * 1000);

// roda ao iniciar
rodarBot();
