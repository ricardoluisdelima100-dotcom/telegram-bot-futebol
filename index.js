
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "SEU_TOKEN";

async function descobrirChatID() {
    try {
        const resposta = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates?offset=-1`);
        const dados = await resposta.json();

        console.log("RESPOSTA FINAL:");
        console.log(JSON.stringify(dados, null, 2));
    } catch (erro) {
        console.log("ERRO:", erro);
    }
}

descobrirChatID();
