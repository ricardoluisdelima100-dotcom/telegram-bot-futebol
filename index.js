
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "8793955195:AAHbEl-PcFo-vlYFDlGRm_GF9SI3q_xHGCI";

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
