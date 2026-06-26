const DOKPLOY_HOST = "http://13.140.143.25:3000";
const DOKPLOY_API_KEY = "sGJvQmuJEkShRGLBuRjfqygozszOHacmrZQndmNKjlTjuMHbVBxdhmnuqafuvxcR";

async function run() {
  const applicationId = "BmYemD2IIr9xn06wbUvv9";
  
  // Try to update env and check response
  const response = await fetch(`${DOKPLOY_HOST}/api/application.update`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "x-api-key": DOKPLOY_API_KEY,
    },
    body: JSON.stringify({
      applicationId,
      env: "DATABASE_URL=postgresql://glowada_admin:glowadaDbPass2026@glowada-db-oucr2q:5432/glowada?schema=public\nJWT_SECRET=glowada-secret-key-2026-amber-gold\nPORT=3000"
    })
  });

  const text = await response.text();
  console.log("Response Status:", response.status);
  console.log("Response Body:", text);
}

run().catch(console.error);
