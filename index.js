
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "Token for the bot Bot Odds Pro @odds_futebol_bot has been revoked. New token is:

8793955195:AAHbEl-PcFo-vlYFDlGRm_GF9SI3q_xHGCI";
const CHAT_ID = "5167844978";

fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔥 TESTE FUNCIONANDO`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
