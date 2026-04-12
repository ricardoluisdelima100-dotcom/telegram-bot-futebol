const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// ⚽ jogos
const jogos = [
  ["Flamengo", "Palmeiras"],
  ["Corinthians", "São Paulo"],
  ["Grêmio", "Internacional"],
  ["Atlético-MG", "Cruzeiro"],
  ["Barcelona", "Real Madrid"],
  ["Manchester City", "Liverpool"]
];

// 👤 jogadores
const jogadores = ["João Silva", "Carlos Souza", "Pedro Lima", "Lucas Rocha"];

// 🕒 horário
function gerarHorario() {
  const horas = ["18:00", "19:00", "20:00", "21:30", "22:00"];
  return horas[Math.floor(Math.random() * horas.length)];
}

// 📅 dia
function gerarData() {
  return Math.random() > 0.5 ? "Hoje" : "Amanhã";
}

// 🎯 gerar jogo
function gerarJogo(jogo) {
  const chutesCasa = (Math.random() * 2 + 9).toFixed(1);
  const chutesFora = (Math.random() * 2 + 8).toFixed(1);

  const escanteiosCasa = Math.floor(Math.random() * 3 + 4);
  const escanteiosFora = Math.floor(Math.random() * 3 + 4);

  const cartoes = Math.floor(Math.random() * 3 + 3);

  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  return `
⚽🔥 ${jogo[0]} 🆚 ${jogo[1]}

📊 CHUTES:
➡️ ${jogo[0]} +${chutesCasa}
➡️ ${jogo[1]} +${chutesFora}

📊 ESCANTEIOS:
➡️ ${jogo[0]} +${escanteiosCasa}
➡️ ${jogo[1]} +${escanteiosFora}

📊 CARTÕES:
➡️ Mais de ${cartoes}
➡️ Ambas recebem cartão
🟨 ${jogador} leva cartão
`;
}

// 🎯 bilhete
function gerarBilhete() {
  const jogo1 = jogos[Math.floor(Math.random() * jogos.length)];
  const jogo2 = jogos[Math.floor(Math.random() * jogos.length)];

  const odd1 = (Math.random() * 1.5 + 1.80).toFixed(2);
  const odd2 = (Math.random() * 1.5 + 1.80).toFixed(2);
  const total = (odd1 * odd2).toFixed(2);

  const horario = gerarHorario();
  const data = gerarData();

  return `🚨💣🔥 BILHETE VIP EXPLOSIVO 🔥💣🚨

💰💸💎 OPORTUNIDADE DE OURO 💎💸💰

🎯📊 ODD TOTAL: ${total} 🚀🔥

📅 ${data} às ${horario}
⏱️ TEMPO REGULAMENTAR (90 MIN)

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo1)}
📈 Odd: ${odd1}

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo2)}
📈 Odd: ${odd2}

━━━━━━━━━━━━━━━━━━

💰💸 ENTRADA: ${["3%", "4%", "5%"][Math.floor(Math.random() * 3)]}
📊🧠 CONFIANÇA: ${["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)]}

🚨⏳ CORRE! ESSA ODD VAI CAIR
🔥💣 FOCO NO GREEN 🟢🏆`;
}

// 📤 envio
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

// 🔁 loop
setInterval(() => {
  console.log("📢 ENVIANDO BILHETE...");
  enviarMensagem(gerarBilhete());
}, 60000);

// 🚀 start
console.log("🤖 BOT ESTILO ORIGINAL ATIVO");
