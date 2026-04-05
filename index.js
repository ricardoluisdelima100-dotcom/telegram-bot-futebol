
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "Token for the bot Bot Odds Pro @odds_futebol_bot has been revoked. New token is:

8793955195:AAFr4qfUsciWx72lKEKA7GK1KgRPg4b-Noc
";
const CHAT_ID = "5167844978";

fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔥 TESTE FUNCIONANDO`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
