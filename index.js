setInterval(() => {
  if (!dentroDoHorario()) return;

  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const odd = gerarOdd();
  const minuto = gerarMinuto();

  if (odd < 2.2) return;

  const confianca = gerarConfianca(odd);
  const gestao = gerarGestao(odd);

  const msg = `🔥 ALERTA VIP AO VIVO

⚽ ${jogo[0]} vs ${jogo[1]}
📈 Odd: ${odd}
⏰ ${minuto} min

💰 Entrada de valor detectada!

📊 Confiança: ${confianca}
⚠️ Gestão: ${gestao}

🚨 ENTRE AGORA!`;

  if (podeEnviar(msg)) {
    enviarMensagem(msg);
  }

}, 60000);
