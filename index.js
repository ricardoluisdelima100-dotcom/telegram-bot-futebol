
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "
8617153532:AAGNAhmffTzbdoBw2sIkZ4fLI6No_ZKmHUo";

async function descobrirChatID() {
    const resposta = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
    const dados = await resposta.json();

    console.log("CHAT ID ENCONTRADO:");
    console.log(JSON.stringify(dados, null, 2));
}

descobrirChatID();
