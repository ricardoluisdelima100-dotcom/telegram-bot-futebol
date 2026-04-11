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

// 🎯 gerar dados de um jogo
function gerarJogo(jogo) {
  const chutes = (Math.random() * 3 + 8).toFixed(1);
  const escanteios = (Math.random() * 3 + 4).toFixed(0);
  const cartoes = (Math.random() * 3 + 4).toFixed(0);
  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  return `
⚽ ${jogo[0]} 🆚 ${jogo[1]}

📊 CHUTES:
➡️ ${jogo[0]} +${chutes}
➡️ ${jogo[1]} +${chutes}

📊 ESCANTEIOS:
➡️ ${jogo[0]} +${escanteios}
➡️ ${jogo[1]} +${escanteios}

📊 CARTÕES:
➡️ Mais de ${cartoes}
➡️ Ambas recebem cartão
🟨 ${jogador} leva cartão
`;
}

// 🎯 bilhete com 2 jogos
function gerarBilhete() {
  const jogo1 = jogos[Math.floor(Math.random() * jogos.length)];
  const jogo2 = jogos[Math.floor(Math.random() * jogos.length)];

  const oddTotal = (Math.random() * 5 + 4).toFixed(2);
  const horario = gerarHorario();
  const data = gerarData();

  return `🚨💣🔥 BILHETE VIP DUPLO 🔥💣🚨

💰💸 ENTRADA DE VALOR IDENTIFICADA 💸💰

🎯 ODD TOTAL: ${oddTotal} 🚀

📅 ${data} às ${horario}  
⏱️ TEMPO REGULAMENTAR (90 MIN)

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo1)}

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo2)}

━━━━━━━━━━━━━━━━━━

💰 Entrada: ${["3%", "4%", "5%"][Math.floor(Math.random() * 3)]}
📊 Confiança: ${["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)]}

⏳ Entrada antecipada — odds podem baixar!`;
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

  console.log("📤 ENVIADO");
}

// 🔁 LOOP (1 minuto)
setInterval(() => {
  console.log("📢 ENVIANDO BILHETE...");
  enviarMensagem(gerarBilhete());
}, 60000);

// 🚀 start
console.log("🤖 BOT VIP SEM GREEN ATIVO");
