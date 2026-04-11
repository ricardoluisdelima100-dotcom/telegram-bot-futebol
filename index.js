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

// 👤 jogadores fictícios
const jogadores = ["João Silva", "Carlos Souza", "Pedro Lima", "Lucas Rocha"];

// 🕒 horário futuro
function gerarHorario() {
  const horas = ["18:00", "19:00", "20:00", "21:30", "22:00"];
  return horas[Math.floor(Math.random() * horas.length)];
}

// 📅 dia
function gerarData() {
  const dias = ["Hoje", "Amanhã"];
  return dias[Math.floor(Math.random() * dias.length)];
}

// 🎯 gerar bilhete completo
function gerarBilhete(jogo) {
  const oddTotal = (Math.random() * 3 + 3).toFixed(2);

  const chutesCasa = (Math.random() * 3 + 8).toFixed(1);
  const chutesFora = (Math.random() * 3 + 7).toFixed(1);

  const escanteiosCasa = (Math.random() * 3 + 4).toFixed(0);
  const escanteiosFora = (Math.random() * 3 + 4).toFixed(0);

  const cartoesTotal = (Math.random() * 3 + 4).toFixed(0);

  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  const gestao = ["3%", "4%", "5%"][Math.floor(Math.random() * 3)];
  const confianca = ["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)];

  const horario = gerarHorario();
  const data = gerarData();

  return `🚨💣🔥 BILHETE VIP PRÉ-JOGO 🔥💣🚨

💰💸 OPORTUNIDADE IDENTIFICADA 💸💰

🎯📊 ODD TOTAL: ${oddTotal} 🚀

━━━━━━━━━━━━━━━━━━

⚽ ${jogo[0]} 🆚 ${jogo[1]}  
📅 ${data} às ${horario}  
⏱️ TEMPO REGULAMENTAR (90 MIN)

📊🎯 CHUTES:
🔥 ${jogo[0]} ➕${chutesCasa} chutes  
⚠️ ${jogo[1]} ➕${chutesFora} chutes  

📊🥅 ESCANTEIOS:
🚀 ${jogo[0]} ➕${escanteiosCasa} escanteios  
⚡ ${jogo[1]} ➕${escanteiosFora} escanteios  

📊🟨 CARTÕES:
🔥 Mais de ${cartoesTotal} cartões no jogo  
⚠️ Ambas equipes recebem cartão  
🟨 ${jogador} para receber cartão  

━━━━━━━━━━━━━━━━━━

💰💸 ENTRADA: ${gestao} da banca  
📊🧠 CONFIANÇA: ${confianca}

⏳ Entrada antecipada — odds podem baixar!`;
}

// 📤 envio
async function enviarMensagem(texto) {
  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: texto
      })
    });

    console.log("📤 ENVIADO");

  } catch (err) {
    console.log("❌ ERRO:", err);
  }
}

// 🔁 envio a cada 1 minuto
setInterval(() => {
  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const msg = gerarBilhete(jogo);

  console.log("📢 ENVIANDO BILHETE PRÉ-JOGO...");
  enviarMensagem(msg);

}, 60000);

// 🚀 iniciar
console.log("🤖 BOT PRÉ-JOGO (JOGO TODO) ATIVO");
