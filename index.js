function gerarOdd() {
  return (Math.random() * 3 + 1).toFixed(2);
}

setInterval(() => {
  const odd = gerarOdd();

  const msg = `🔥 ALERTA DE ODDS

⚽ Time A vs Time B
📈 Odd: ${odd}

🚀 Oportunidade detectada!`;

  enviarMensagem(msg);
}, 60000);
