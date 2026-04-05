async function buscarOdds() {
  try {
    console.log("🔍 Buscando odds...");

    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?markets=h2h&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    // 🛑 valida retorno
    if (!Array.isArray(data)) {
      console.log("❌ ERRO DA API:", data);
      return;
    }

    if (data.length === 0) {
      console.log("❌ Nenhum jogo disponível");
      return;
    }

    console.log("📊 TOTAL JOGOS:", data.length);

    // 🔥 pega um jogo válido
    const jogo = data.find(j =>
      j && j.home_team && j.away_team && j.bookmakers?.length
    );

    if (!jogo) {
      console.log("❌ Nenhum jogo válido com odds");
      return;
    }

    const casa = jogo.home_team;
    const fora = jogo.away_team;

    const odd = jogo.bookmakers[0]?.markets[0]?.outcomes[0]?.price;

    console.log("🎯 JOGO:", casa, "vs", fora);
    console.log("📈 ODD:", odd);

    const msg = `🔥 ALERTA REAL VIP

⚽ ${casa} vs ${fora}
📈 Odd: ${odd}

💰 Entrada de valor detectada!`;

    enviarMensagem(msg);

  } catch (err) {
    console.log("❌ ERRO GERAL:", err);
  }
}
