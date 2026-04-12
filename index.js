const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_KEY = process.env.RAPIDAPI_KEY;

async function buscarJogos() {
  const res = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?next=5", {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });

  const data = await res.json();

  console.log(JSON.stringify(data, null, 2));
}

buscarJogos();
