
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "Token for the bot Bot Odds Pro @odds_futebol_bot has been revoked. New token is:

8793955195:AAHbEl-PcFo-vlYFDlGRm_GF9SI3q_xHGCI";

fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=SEU_CHAT_ID_AQUI&text=teste`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
