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

// ================= DATA DE HOJE =================
function getHoje() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

// ================= BUSCAR JOGOS DO DIA =================
async function buscarJogosDoDia() {
  try {
    const hoje = getHoje();

    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${hoje}`
    );

    const eventos = data.events;

    if (!eventos || eventos.length === 0) return [];

    return eventos.slice(0, 3).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro jogos do dia:", err.message);
    return [];
  }
}

// ================= BUSCAR JOGOS AO VIVO =================
async function buscarJogosAoVivo() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events/live"
    );

    const eventos = data.events;

    if (!eventos || eventos.length === 0) return [];

    return eventos.slice(0, 2).map(ev => {
      return `${ev.homeTeam.name} vs ${ev.awayTeam.name}`;
    });

  } catch (err) {
    console.log("Erro jogos ao vivo:", err.message);
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
- Over 3.5 cartões

🔥 Entrada com base em padrão ofensivo`;
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

  // PRÉ-JOGO (DO DIA)
  if (doDia.length > 0) {
    for (let jogo of doDia) {
      await enviarMensagem(gerarMensagem(jogo, "📅 PRÉ-JOGO"));
    }
  } else {
    await enviarMensagem("⚠️ Nenhum jogo do dia encontrado.");
  }
}

// roda a cada 10 minutos
setInterval(rodarBot, 10 * 60 * 1000);

// roda ao iniciar
rodarBot();
