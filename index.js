const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.ID_DO_CHAT;

// ⚽ jogos mais realistas
const jogos = [
  ["Flamengo", "Palmeiras"],
  ["Corinthians", "São Paulo"],
  ["Atlético-MG", "Fluminense"],
  ["Grêmio", "Internacional"],
  ["Botafogo", "Vasco"],
  ["Cruzeiro", "Bahia"],
  ["Barcelona", "Real Madrid"],
  ["Manchester City", "Arsenal"],
  ["Liverpool", "Chelsea"],
  ["PSG", "Marseille"]
];

// 👤 jogadores fictícios
const jogadores = ["João Silva", "Carlos Souza", "Pedro Lima", "Lucas Rocha"];

// 🧠 controle de repetição
let ultimoJogo1 = "";
let ultimoJogo2 = "";

function escolherJogoUnico() {
  let jogo;

  do {
    jogo = jogos[Math.floor(Math.random() * jogos.length)];
  } while (
    jogo.join() === ultimoJogo1 ||
    jogo.join() === ultimoJogo2
  );

  ultimoJogo2 = ultimoJogo1;
  ultimoJogo1 = jogo.join();

  return jogo;
}

// 🕒 horário
function gerarHorario() {
  const horas = ["18:00", "19:00", "20:00", "21:30", "22:00"];
  return horas[Math.floor(Math.random() * horas.length)];
}

// 📅 data
function gerarData() {
  return Math.random() > 0.5 ? "Hoje" : "Amanhã";
}

// 🎯 gerar jogo realista
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

// 🎯 bilhete profissional
function gerarBilhete() {
  const jogo1 = escolherJogoUnico();
  const jogo2 = escolherJogoUnico();

  const oddTotal = (Math.random() * 3 + 4.5).toFixed(2);
  const horario = gerarHorario();
  const data = gerarData();

  const gestao = ["3%", "4%", "5%"][Math.floor(Math.random() * 3)];
  const confianca = ["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)];

  return `🚨🔥 BILHETE VIP SELECIONADO 🔥🚨

💰 OPORTUNIDADE IDENTIFICADA

🎯 ODD TOTAL: ${oddTotal}

📅 ${data} às ${horario}
⏱️ TEMPO REGULAMENTAR (90 MIN)

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo1)}

━━━━━━━━━━━━━━━━━━

${gerarJogo(jogo2)}

━━━━━━━━━━━━━━━━━━

💰 Entrada: ${gestao} da banca
📊 Confiança: ${confianca}

⏳ Odds podem sofrer alteração`;
}

// 📤 envio
async function enviarMensagem(texto) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: texto
      })
    });

    const data = await res.json();
    console.log("📤 ENVIO:", data);

  } catch (err) {
    console.log("❌ ERRO:", err);
  }
}

// 🔁 loop
setInterval(() => {
  console.log("📢 ENVIANDO BILHETE...");
  enviarMensagem(gerarBilhete());
}, 60000);

// 🚀 start
console.log("🤖 BOT PROFISSIONAL ATIVO");
