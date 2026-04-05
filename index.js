const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// 🔐 CONFIG
const TOKEN = "SEU_TOKEN_AQUI";
const CHAT_ID = "SEU_CHAT_ID_AQUI";

// 🧠 CONTROLE
let ultimaMensagem = "";

// 📤 ENVIAR MENSAGEM
async function enviarMensagem(texto) {
    try {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: texto
            })
        });

        console.log("✅ Mensagem enviada!");
    } catch (erro) {
        console.log("❌ Erro ao enviar:", erro);
    }
}

// ⏰ HORÁRIO (10h às 22h)
function dentroDoHorario() {
    const hora = new Date().getHours();
    return hora >= 10 && hora <= 22;
}

// 🚫 ANTI-SPAM
function podeEnviar(msg) {
    if (msg !== ultimaMensagem) {
        ultimaMensagem = msg;
        return true;
    }
    return false;
}

// ⚙️ GERAR MENSAGEM (SIMULA ODDS)
function gerarMensagem() {
    const odds = (Math.random() * 3 + 1).toFixed(2);

    return `🔥 ALERTA DE ODDS 🔥

⚽ Jogo: Time A vs Time B
📈 Odd: ${odds}
⏰ Hora: ${new Date().toLocaleTimeString()}

🚀 Oportunidade detectada!`;
}

// 🔁 LOOP AUTOMÁTICO
setInterval(() => {
    console.log("🔄 Verificando...");

    const mensagem = gerarMensagem();

    if (!dentroDoHorario()) {
        console.log("😴 Fora do horário");
        return;
    }

    if (!podeEnviar(mensagem)) {
        console.log("🚫 Mensagem repetida");
        return;
    }

    enviarMensagem(mensagem);

}, 60000); // 1 minuto
