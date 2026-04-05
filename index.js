
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "8793955195:AAHCkewHUV8iwPVxifd9afha-CLla5sdfFE";

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
