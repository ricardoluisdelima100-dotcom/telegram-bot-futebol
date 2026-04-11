function gerarBilhete(jogo) {
  const oddTotal = (Math.random() * 3 + 3).toFixed(2);

  const chutesCasa = (Math.random() * 3 + 5).toFixed(1);
  const chutesFora = (Math.random() * 3 + 6).toFixed(1);

  const escanteiosCasa = (Math.random() * 2 + 2).toFixed(0);
  const escanteiosFora = (Math.random() * 2 + 3).toFixed(0);

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

━━━━━━━━━━━━━━━━━━

💰💸 ENTRADA: ${gestao} da banca  
📊🧠 CONFIANÇA: ${confianca}

🚨⏳ CORRE! ESSA ODD VAI CAIR  
🔥💣 ENTRE AGORA E BUSQUE O GREEN 🟢🏆`;
}
