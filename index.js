import axios from "axios";
import * as cheerio from "cheerio";

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

// ================= BUSCAR JOGOS BRASIL (SCRAPING REAL) =================
async function buscarJogosBrasil() {
  try {
    const { data } = await axios.get("https://www.sofascore.com/football", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    let jogos = [];

    $(".event__match").each((i, el) => {
      const liga = $(el).find(".event__title").text().toLowerCase();

      // 🔥 FILTRA SÓ BRASIL
      if (!liga.includes("brazil")) return;

      const casa = $(el).find(".event__participant--home").text().trim();
      const fora = $(el).find(".event__participant--away").text().trim();

      if (casa && fora) {
        jogos.push(`${casa} vs ${fora}`);
      }
    });

    return jogos.slice(0, 5);

  } catch (err) {
    console.log("Erro ao buscar jogos:", err.message);
    return [];
  }
}

// ================= GERAR PALPITE =================
function gerarPalpite(jogo) {
  return `🇧🇷 JOGO DO DIA

⚽ ${jogo}

🎯 PALPITES:

⚽ Over 1.5 gols
🚩 Over 8.5 escanteios
🟨 Over 3.5 cartões`;
}

// ================= EXECUÇÃO =================
async function rodarBot() {
  console.log("BOT RODANDO...");

  const jogos = await buscarJogosBrasil();

  if (jogos.length === 0) {
    await enviarMensagem("⚠️ Não encontrei jogos do Brasil hoje.");
    return;
  }

  for (let jogo of jogos) {
    await enviarMensagem(gerarPalpite(jogo));
  }
}

// roda a cada 1 hora
setInterval(rodarBot, 60 * 60 * 1000);

// roda ao iniciar
rodarBot();
