setInterval(() => {
  const odd = gerarOdd();

  if (odd < 2.0) {
    console.log("🚫 Odd baixa, ignorando...");
    return;
  }

  const msg = `🔥 ALERTA TOP

⚽ Time A vs Time B
📈 Odd: ${odd}

💰 Entrada de valor!`;

  enviarMensagem(msg);
}, 60000);
