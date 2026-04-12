const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

const jogadores = ["João Silva", "Carlos Souza", "Pedro Lima", "Lucas Rocha"];

// enviar mensagem
async function enviarMensagem(texto) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: texto
    })
  });
}

// gerar odd realista
function gerarOdd() {
  return (Math.random() * 1.5 + 1.80).toFixed(2);
}

// gerar análise estilo SofaScore
function gerarAnalise(jogo) {
  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  return `
🧠 ANÁLISE DO JOGO:

🔥 ${jogo.strHomeTeam} vem pressionando ofensivamente  
📊 Tendência de escanteios elevados  
⚠️ Jogo com média alta de cartões  

💣 ${jogador} com risco de cartão  

📈 Entrada com valor detectada
`;
}

// gerar bilhete
function gerarBilhete(jogo1, jogo2) {
  const odd1 = gerarOdd();
  const odd2 = gerarOdd();

  const total = (odd1 * odd2).toFixed(2);

  return `🚨🔥 BILHETE VIP 🔥🚨

🎯 ODD TOTAL: ${total}

━━━━━━━━━━━━━━━━━━

⚽ ${jogo1.strHomeTeam} vs ${jogo1.strAwayTeam}
📈 Odd: ${odd1}

${gerarAnalise(jogo1)}

━━━━━━━━━━━━━━━━━━

⚽ ${jogo2.strHomeTeam} vs ${jogo2.strAwayTeam}
📈 Odd: ${odd2}

${gerarAnalise(jogo2)}

━━━━━━━━━━━━━━━━━━

💰 Entrada: 3% a 5%
📊 Confiança: ALTA 🔥

⏳ Odds podem baixar`;
}

// buscar jogos reais
async function buscarJogos() {
  try {
    const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328");
    const data = await res.json();

    if (!data.events || data.events.length < 2) return;

    const j1 = data.events[Math.floor(Math.random() * data.events.length)];
    const j2 = data.events[Math.floor(Math.random() * data.events.length)];

    const msg = gerarBilhete(j1, j2);

    enviarMensagem(msg);

  } catch (err) {
    console.log(err);
  }
}

setInterval(buscarJogos, 60000);

console.log("🤖 BOT ESTÁVEL ATIVO");
