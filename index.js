
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "COLE_SEU_TOKEN_AQUI";

async function descobrirChatID() {
    try {
        const resposta = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
        const dados = await resposta.json();

        console.log("RESPOSTA:");
        console.log(JSON.stringify(dados, null, 2));
    } catch (erro) {
        console.log("ERRO:", erro);
    }
}

descobrirChatID();
