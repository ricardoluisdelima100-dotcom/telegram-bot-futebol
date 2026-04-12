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

// ================= BUSCAR JOGOS DO BRASIL =================
async function buscarJogosBrasil() {
  try {
    const { data } = await axios.get(
      `https://api.sofascore.com/api/v1/sport/football/scheduled-events/${new Date().toISOString().split("T")[0]}`
    );

    if (!data.events) return [];

    const agora = new Date();

    return data.events
      .filter(ev => {
        // 🇧🇷 só Brasil
        if (ev.tournament.category.name !== "Brazil") return false;

        // ⏰ horário do jogo
        const dataJogo = new Date(ev.startTimestamp * 1000);

        // 🔥 só jogos que ainda vão acontecer
        return dataJogo > agora;
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
  const horario = new Date(jogo.startTimestamp * 1000).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `🇧🇷 ${liga}

⚽ ${casa} vs ${fora}
🕒 ${horario}

🎯 PALPITES:

⚽ Gols: Over 1.5
🚩 Escanteios: Over 8.5
🟨 Cartões: Over 3.5`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Nenhum jogo futuro do Brasil hoje.");
    return;
  }

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
