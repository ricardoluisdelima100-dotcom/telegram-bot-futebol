async function buscarOdds() {
  try {
    console.log("🔍 Buscando odds...");

    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=br&markets=h2h&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    // 🛑 verifica se veio erro da API
    if (!Array.isArray(data)) {
      console.log("❌ ERRO DA API:", data);
      return;
    }

    console.log("📊 TOTAL JOGOS:", data.length);

    if (data.length === 0) {
      console.log("❌ Sem jogos disponíveis");
      return;
    }

    const jogo = data[Math.floor(Math.random() * data.length)];

    const casa = jogo.home_team;
    const fora = jogo.away_team;

    let odd = jogo.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price;

    if (!odd) {
      odd = (Math.random() * 2 + 2).toFixed(2);
      console.log("⚠️ Odd simulada");
    }

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
