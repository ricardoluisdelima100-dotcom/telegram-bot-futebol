
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "COLE_SEU_TOKEN_NOVO_AQUI";

async function descobrirChatID() {
    const resposta = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    const dados = await resposta.json();

    console.log("CHAT ID ENCONTRADO:");
    console.log(JSON.stringify(dados, null, 2));
}

descobrirChatID();
