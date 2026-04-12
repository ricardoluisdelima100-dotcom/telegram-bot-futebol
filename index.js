const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// 👤 jogadores fictícios
const jogadores = ["João Silva", "Carlos Souza", "Pedro Lima", "Lucas Rocha"];

// 📤 enviar mensagem
async function enviarMensagem(texto) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: texto
    })
  });

  console.log("📤 ENVIADO");
}

// 🎯 gerar jogo com dados reais
function gerarJogo(jogo) {
  const chutesCasa = (Math.random() * 2 + 9).toFixed(1);
  const chutesFora = (Math.random() * 2 + 8).toFixed(1);

  const escanteiosCasa = Math.floor(Math.random() * 3 + 4);
  const escanteiosFora = Math.floor(Math.random() * 3 + 4);

  const cartoes = Math.floor(Math.random() * 3 + 3);

  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  return `
⚽🔥 ${jogo.strHomeTeam} 🆚 ${jogo.strAwayTeam}

📊 CHUTES:
➡️ ${jogo.strHomeTeam} +${chutesCasa}
➡️ ${jogo.strAwayTeam} +${chutesFora}

📊 ESCANTEIOS:
➡️ ${jogo.strHomeTeam} +${escanteiosCasa}
➡️ ${jogo.strAwayTeam} +${escanteiosFora}

📊 CARTÕES:
➡️ Mais de ${cartoes}
➡️ Ambas recebem cartão
🟨 ${jogador} leva cartão
`;
}

// 🎯 gerar bilhete com jogos reais
function gerarBilhete(jogo1, jogo2) {
  const oddTotal = (Math.random() * 3 + 4.5).toFixed(2);

  return `🚨🔥 BILHETE VIP COM JOGOS REAIS 🔥🚨

💰 OPORTUNIDADE IDENTIFICADA

🎯 ODD TOTAL: ${oddTotal}

📅 Hoje
⏱️ TEMPO REGULAMENTAR (90 MIN)

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo1)}

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo2)}

━━━━━━━━━━━━━━━━━━

💰 Entrada: ${["3%", "4%", "5%"][Math.floor(Math.random() * 3)]}
📊 Confiança: ${["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)]}

⏳ Odds podem sofrer alteração`;
}

// 🔥 buscar jogos reais
async function buscarJogos() {
  try {
    console.log("🔍 Buscando jogos reais...");

    const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328");
    const data = await res.json();

    if (!data.events || data.events.length < 2) {
      console.log("❌ Poucos jogos disponíveis");
      return;
    }

    const jogo1 = data.events[Math.floor(Math.random() * data.events.length)];
    const jogo2 = data.events[Math.floor(Math.random() * data.events.length)];

    const msg = gerarBilhete(jogo1, jogo2);

    enviarMensagem(msg);

  } catch (err) {
    console.log("❌ ERRO:", err);
  }
}

// 🔁 loop (1 minuto)
setInterval(buscarJogos, 60000);

// 🚀 start
console.log("🤖 BOT COM JOGOS REAIS ATIVO");
