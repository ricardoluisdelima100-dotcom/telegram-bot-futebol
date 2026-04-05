
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "8617153532:AAHFMtpsAB_5SOKol9cjc78PAUYnSX5bw88";

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
