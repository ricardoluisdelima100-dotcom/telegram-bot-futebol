import axios from "axios";
import * as cheerio from "cheerio"; // CORRIGIDO AQUI

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

// ================= BUSCAR JOGOS REAIS =================
async function buscarJogosReais() {
  try {
    const { data } = await axios.get("https://www.sofascore.com/football", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    let jogos = [];

    $(".event__match").each((i, el) => {
      const casa = $(el).find(".event__participant--home").text().trim();
      const fora = $(el).find(".event__participant--away").text().trim();

      if (casa && fora) {
        jogos.push(`${casa} vs ${fora}`);
      }
    });

    return jogos.slice(0, 2);
  } catch (err) {
    console.log("Erro ao buscar jogos:", err.message);
    return [];
  }
}

// ================= GERAR BILHETE =================
function gerarBilhete(jogo) {
  return `🎯 BILHETE DO DIA

⚽ ${jogo}

✅ Seguro:
- Over 1.5 gols
- Over 7 escanteios

⚖️ Médio:
- Over 2.5 gols
- Over 8.5 escanteios
- Over 3.5 cartões

💣 Arriscado:
- Over 3.5 gols
- Over 10 escanteios
- Over 5.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosReais();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Não encontrei jogos hoje.");
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
