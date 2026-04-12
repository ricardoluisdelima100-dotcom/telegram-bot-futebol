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

// ================= BUSCAR JOGOS REAIS (API REAL) =================
async function buscarJogosReais() {
  try {
    const { data } = await axios.get(
      "https://api.sofascore.com/api/v1/sport/football/events/live"
    );

    const eventos = data.events;

    if (!eventos || eventos.length === 0) {
      return [];
    }

    const jogos = eventos.map(ev => {
      const casa = ev.homeTeam.name;
      const fora = ev.awayTeam.name;
      return `${casa} vs ${fora}`;
    });

    return jogos.slice(0, 2);
  } catch (err) {
    console.log("Erro ao buscar jogos:", err.message);
    return [];
  }
}

// ================= GERAR BILHETE =================
function gerarBilhete(jogo) {
  return `🎯 BILHETE AO VIVO

⚽ ${jogo}

🔥 Mercado sugerido:

- Over 1.5 gols
- Over 8.5 escanteios
- Over 3.5 cartões

💡 Jogo com tendência ofensiva`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosReais();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo ao vivo no momento.");
    return;
  }

  for (let jogo of jogos) {
    const mensagem = gerarBilhete(jogo);
    await enviarMensagem(mensagem);
  }
}

// roda a cada 10 minutos
setInterval(rodarBot, 10 * 60 * 1000);

// roda ao iniciar
rodarBot();
