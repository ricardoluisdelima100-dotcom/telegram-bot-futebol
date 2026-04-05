
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const TOKEN = "COLE_SEU_TOKEN_AQUI";

async function responder() {
    try {
        const res = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
        const data = await res.json();

        if (!data.result.length) {
            console.log("Nenhuma mensagem ainda...");
            return;
        }

        const chat_id = data.result[data.result.length - 1].message.chat.id;

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: "🔥 AGORA FUNCIONOU! Seu bot está ativo!"
            })
        });

        console.log("✅ Mensagem enviada para:", chat_id);

    } catch (err) {
        console.log("❌ Erro:", err);
    }
}

setInterval(responder, 10000);
