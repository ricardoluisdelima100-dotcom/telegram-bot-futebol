const jogo = lista[Math.floor(Math.random() * lista.length)];

const casa = jogo.home_team;
const fora = jogo.away_team;

let odd = jogo.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price;

if (!odd) {
  odd = (Math.random() * 2 + 2.0).toFixed(2);
}

console.log("JOGO:", casa, "vs", fora);
console.log("ODD:", odd);

const msg = `🔥 ALERTA REAL VIP

⚽ ${casa} vs ${fora}
📈 Odd: ${odd}

💰 Entrada de valor detectada!`;

enviarMensagem(msg);
