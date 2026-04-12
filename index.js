const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// 👤 jogadores
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

// 🎯 gerar odd realista
function gerarOddRealista() {
  return (Math.random() * 1.5 + 1.80).toFixed(2); // odds entre 1.80 e 3.30
}

// 🎯 gerar mercados
function gerarMercados(jogo) {
  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  const chutes = (Math.random() * 2 + 9).toFixed(1);
  const escanteios = Math.floor(Math.random() * 3 + 4);
  const cartoes = Math.floor(Math.random() * 3 + 3);

  return `
⚽🔥 ${jogo.strHomeTeam} 🆚 ${jogo.strAwayTeam}

📊 CHUTES:
➡️ ${jogo.strHomeTeam} +${chutes}
➡️ ${jogo.strAwayTeam} +${chutes}

📊 ESCANTEIOS:
➡️ ${jogo.strHomeTeam} +${escanteios}
➡️ ${jogo.strAwayTeam} +${escanteios}

📊 CARTÕES:
➡️ Mais de ${cartoes}
➡️ Ambas recebem cartão
🟨 ${jogador} leva cartão
`;
}

// 🎯 bilhete
function gerarBilhete(jogo1, jogo2) {
  const odd1 = gerarOddRealista();
  const odd2 = gerarOddRealista();

  const oddTotal = (odd1 * odd2).toFixed(2);

  return `🚨🔥 BILHETE VIP 🔥🚨

💰 OPORTUNIDADE IDENTIFICADA

🎯 ODD TOTAL: ${oddTotal} 🚀

━━━━━━━━━━━━━━━━━━

${gerarMercados(jogo1)}
📈 Odd: ${odd1}

━━━━━━━━━━━━━━━━━━

${gerarMercados(jogo2)}
📈 Odd: ${odd2}

━━━━━━━━━━━━━━━━━━

💰 Entrada: ${["3%", "4%", "5%"][Math.floor(Math.random() * 3)]}
📊 Confiança: ${["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)]}

⏳ Odds podem sofrer alteração`;
}

// 🔥 buscar jogos reais
async function buscarJogos() {
  try {
    console.log("🔍 Buscando jogos...");

    const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328");
    const data = await res.json();

    if (!data.events || data.events.length < 2) {
      console.log("❌ Poucos jogos");
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

// 🔁 loop
setInterval(buscarJogos, 60000);

// 🚀 start
console.log("🤖 BOT SEM API (ESTÁVEL) ATIVO");
