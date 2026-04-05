async function buscarOdds() {
  try {
    console.log("🔍 Buscando odds...");

    const url = `https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=br&markets=h2h&apiKey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      console.log("❌ Sem jogos");
      return;
    }

    // 🔥 filtrar times brasileiros
    const brasileiros = data.filter(jogo =>
      jogo.home_team.includes("Flamengo") ||
      jogo.home_team.includes("Palmeiras") ||
      jogo.home_team.includes("Corinthians") ||
      jogo.home_team.includes("São Paulo") ||
      jogo.home_team.includes("Grêmio") ||
      jogo.home_team.includes("Santos")
    );

    const lista = brasileiros.length > 0 ? brasileiros : data;

    const jogo = lista[Math.floor(Math.random() * lista.length)];

    const casa = jogo.home_team;
    const fora = jogo.away_team;

    const odd = jogo.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price;

    if (!odd || odd < 2.0) return;

    const msg = `🔥 ALERTA REAL VIP

⚽ ${casa} vs ${fora}
📈 Odd: ${odd}

💰 Entrada de valor detectada!`;

    enviarMensagem(msg);

  } catch (err) {
    console.log("ERRO:", err);
  }
}
