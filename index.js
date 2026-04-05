
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "SEU_TOKEN_AQUI";

async function descobrirChatID() {
    const resposta = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    const dados = await resposta.json();

    console.log("RESPOSTA COMPLETA:");
    console.log(JSON.stringify(dados, null, 2));
}

descobrirChatID();
