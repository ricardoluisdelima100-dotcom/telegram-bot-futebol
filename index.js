const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "8793955195:AAEQuj7wJ6BZaoBoKFQLL-m-JqO_LnrNpcg";
const CHAT_ID = "5167844978";

async function enviar() {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: "🔥 AGORA VAI! TESTE OK"
      })
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("ERRO:", err);
  }
}

enviar();
