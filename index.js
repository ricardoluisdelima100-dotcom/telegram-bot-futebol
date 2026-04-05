setInterval(() => {

  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  const odd = gerarOdd();
  const minuto = gerarMinuto();

  const msg = `🔥 TESTE

⚽ ${jogo[0]} vs ${jogo[1]}
📈 Odd: ${odd}
⏰ ${minuto} min`;

  enviarMensagem(msg);

}, 5000);
