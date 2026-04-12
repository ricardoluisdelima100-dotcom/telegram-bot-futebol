const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function teste() {
  const res = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?next=1", {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
  });

  const data = await res.json();
  console.log(data);
}

teste();
