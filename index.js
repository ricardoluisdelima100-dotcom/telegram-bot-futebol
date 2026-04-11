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

// 🎯 gerar bilhete VIP
function gerarBilhete(jogo) {
  const oddTotal = (Math.random() * 3 + 3).toFixed(2);

  const chutesCasa = (Math.random() * 3 + 5).toFixed(1);
  const chutesFora = (Math.random() * 3 + 6).toFixed(1);

  const escanteiosCasa = (Math.random() * 2 + 2).toFixed(0);
  const escanteiosFora = (Math.random() * 2 + 3).toFixed(0);

  const cartoesTotal = (Math.random() * 3 + 3).toFixed(0);

  const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];

  const gestao = ["3%", "4%", "5%"][Math.floor(Math.random() * 3)];
  const confianca = ["ALTA 🔥", "MUITO ALTA 🚀"][Math.floor(Math.random() * 2)];

  return `🚨💣🔥 BILHETE VIP EXPLOSIVO 🔥💣🚨

💰💸 OPORTUNIDADE DE OURO IDENTIFICADA 💸💰

🎯📊 ODD TOTAL: ${oddTotal} 🚀

━━━━━━━━━━━━━━━━━━

⚽ ${jogo[0]} 🆚 ${jogo[1]}  
⏰⏳ 1º TEMPO — AO VIVO

📊🎯 CHUTES:
🔥 ${jogo[0]} ➕${chutesCasa} chutes  
⚠️ ${jogo[1]} ➖${chutesFora} chutes  

📊🥅 ESCANTEIOS:
🚀 ${jogo[0]} ➕${escanteiosCasa} escanteios  
⚡ ${jogo[1]} ➖${escanteiosFora} escanteios  

📊🟨 CARTÕES:
🔥 Mais de ${cartoesTotal} cartões no jogo  
⚠️ Ambas equipes recebem cartão  
🟨 ${jogador} para receber cartão  

━━━━━━━━━━━━━━━━━━

💰💸 ENTRADA: ${gestao} da banca  
📊🧠 CONFIANÇA: ${confianca}

🚨⏳ ENTRE AGORA!`;
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

// 🔁 ENVIO A CADA 1 MINUTO (SÓ BILHETES)
setInterval(() => {
  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const msg = gerarBilhete(jogo);

  console.log("📢 ENVIANDO BILHETE...");
  enviarMensagem(msg);

}, 60000);

// 🚀 inicia
console.log("🤖 BOT VIP (SÓ BILHETES) ATIVO");
