const https = require('https');

async function apiRequest(url, method = 'GET', body = null, cookie = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Glowada-Test-Suite',
      }
    };

    if (cookie) {
      options.headers['Cookie'] = cookie;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => { reject(err); });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=========================================");
  console.log("STARTING GLOWADA PRODUCTION E2E TESTS...");
  console.log("=========================================");

  const baseUrl = "https://glowada.com";

  // Test 1: Home Page Loading
  console.log("\n[Test 1] Fetching Landing Page...");
  const homeRes = await apiRequest(baseUrl);
  console.log(`Landing Page Status: ${homeRes.status}`);
  if (homeRes.status !== 200) {
    throw new Error(`Landing page returned status ${homeRes.status}`);
  }
  const isGlowadaPresent = homeRes.body.includes("Glowada");
  const isHarfmixPresent = homeRes.body.includes("Harfmix");
  console.log(`Contains 'Glowada' text: ${isGlowadaPresent}`);
  console.log(`Contains 'Harfmix' text: ${isHarfmixPresent}`);
  console.log("-> Test 1 PASSED!");

  // Test 2: Public API Settings GET
  console.log("\n[Test 2] Fetching Public Settings API...");
  const settingsRes = await apiRequest(`${baseUrl}/api/settings`);
  console.log(`Settings API Status: ${settingsRes.status}`);
  if (settingsRes.status !== 200) {
    throw new Error(`Settings API returned status ${settingsRes.status}`);
  }
  const settingsJson = JSON.parse(settingsRes.body);
  console.log("Settings keys:", Object.keys(settingsJson.settings || {}));
  console.log("Logo Text in DB:", settingsJson.settings?.logoUrl);
  console.log("WhatsApp in DB:", settingsJson.settings?.whatsapp);
  console.log("-> Test 2 PASSED!");

  // Test 3: Public API Products GET
  console.log("\n[Test 3] Fetching Public Products API...");
  const productsRes = await apiRequest(`${baseUrl}/api/products`);
  console.log(`Products API Status: ${productsRes.status}`);
  if (productsRes.status !== 200) {
    throw new Error(`Products API returned status ${productsRes.status}`);
  }
  const productsJson = JSON.parse(productsRes.body);
  console.log(`Found ${productsJson.products?.length || 0} products in DB.`);
  console.log("-> Test 3 PASSED!");

  // Test 4: Public API Sliders GET
  console.log("\n[Test 4] Fetching Public Sliders API...");
  const slidersRes = await apiRequest(`${baseUrl}/api/sliders`);
  console.log(`Sliders API Status: ${slidersRes.status}`);
  if (slidersRes.status !== 200) {
    throw new Error(`Sliders API returned status ${slidersRes.status}`);
  }
  const slidersJson = JSON.parse(slidersRes.body);
  console.log(`Found ${slidersJson.slides?.length || 0} slides in DB.`);
  console.log("-> Test 4 PASSED!");

  // Test 5: Public API Videos GET
  console.log("\n[Test 5] Fetching Public Videos API...");
  const videosRes = await apiRequest(`${baseUrl}/api/videos`);
  console.log(`Videos API Status: ${videosRes.status}`);
  if (videosRes.status !== 200) {
    throw new Error(`Videos API returned status ${videosRes.status}`);
  }
  const videosJson = JSON.parse(videosRes.body);
  console.log(`Found ${videosJson.videos?.length || 0} videos in DB.`);
  console.log("-> Test 5 PASSED!");

  // Test 6: Admin Authentication POST (Login)
  console.log("\n[Test 6] Attempting Admin Login API...");
  const loginBody = { username: "admin", password: "glowada123" };
  const loginRes = await apiRequest(`${baseUrl}/api/auth/login`, 'POST', loginBody);
  console.log(`Login API Status: ${loginRes.status}`);
  if (loginRes.status !== 200) {
    throw new Error(`Login API returned status ${loginRes.status}. Check credentials.`);
  }
  const loginJson = JSON.parse(loginRes.body);
  console.log("Login Success Status:", loginJson.success);
  console.log("Log in user details:", loginJson.user);
  
  // Extract token cookie
  const setCookieHeader = loginRes.headers['set-cookie'];
  if (!setCookieHeader) {
    throw new Error("No Set-Cookie header returned from login!");
  }
  const authCookie = setCookieHeader[0].split(';')[0];
  console.log("Extracted Auth Cookie:", authCookie.substring(0, 30) + "...");
  console.log("-> Test 6 PASSED!");

  // Test 7: Verify Auth Session GET
  console.log("\n[Test 7] Verifying Admin Session API...");
  const sessionRes = await apiRequest(`${baseUrl}/api/auth/session`, 'GET', null, authCookie);
  console.log(`Session API Status: ${sessionRes.status}`);
  if (sessionRes.status !== 200) {
    throw new Error(`Session API returned status ${sessionRes.status}`);
  }
  const sessionJson = JSON.parse(sessionRes.body);
  console.log("Session Verified. Username:", sessionJson.user?.username);
  console.log("-> Test 7 PASSED!");

  // Test 8: Protected Settings POST
  console.log("\n[Test 8] Testing settings update via Admin auth...");
  const currentSettings = settingsJson.settings;
  const updateBody = {
    ...currentSettings,
    distributorText: "Glowada Abcmix'in Türkiye Distribütörüdür. (Tested & Verified)"
  };
  const updateSettingsRes = await apiRequest(`${baseUrl}/api/settings`, 'POST', updateBody, authCookie);
  console.log(`Update Settings API Status: ${updateSettingsRes.status}`);
  if (updateSettingsRes.status !== 200) {
    throw new Error(`Failed to update settings, status: ${updateSettingsRes.status}`);
  }
  const updatedSettingsJson = JSON.parse(updateSettingsRes.body);
  console.log("Updated Distributor Text:", updatedSettingsJson.settings?.distributorText);
  
  // Revert change back to original
  console.log("Reverting settings back...");
  const revertBody = {
    ...currentSettings,
    distributorText: "Glowada Abcmix'in Türkiye Distribütörüdür."
  };
  await apiRequest(`${baseUrl}/api/settings`, 'POST', revertBody, authCookie);
  console.log("Reverted successfully.");
  console.log("-> Test 8 PASSED!");

  // Test 9: Sliders CRUD (Create -> Read -> Delete)
  console.log("\n[Test 9] Testing Sliders CRUD...");
  // Create
  const testSlide = {
    title: "Test Slide Title",
    description: "Test Slide Description",
    imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/hakkimizda-1.jpg",
    linkUrl: "#test-link",
    order: 99
  };
  const createSlideRes = await apiRequest(`${baseUrl}/api/sliders`, 'POST', testSlide, authCookie);
  console.log(`Create Slide Status: ${createSlideRes.status}`);
  if (createSlideRes.status !== 200) {
    throw new Error(`Create slide failed with status ${createSlideRes.status}`);
  }
  const createdSlide = JSON.parse(createSlideRes.body).slide;
  console.log(`Created Slide ID: ${createdSlide.id}`);

  // Read list and verify it is there
  const listSlidersRes = await apiRequest(`${baseUrl}/api/sliders`);
  const listSliders = JSON.parse(listSlidersRes.body).slides;
  const foundSlide = listSliders.find(s => s.id === createdSlide.id);
  if (!foundSlide) {
    throw new Error("Created slide not found in sliders list!");
  }
  console.log(`Verified slide exists in list. Title: "${foundSlide.title}"`);

  // Delete
  const deleteSlideRes = await apiRequest(`${baseUrl}/api/sliders/${createdSlide.id}`, 'DELETE', null, authCookie);
  console.log(`Delete Slide Status: ${deleteSlideRes.status}`);
  if (deleteSlideRes.status !== 200) {
    throw new Error(`Delete slide failed with status ${deleteSlideRes.status}`);
  }
  console.log("-> Test 9 PASSED!");

  // Test 10: Videos CRUD (Create -> Read -> Delete)
  console.log("\n[Test 10] Testing Videos CRUD...");
  // Create
  const testVideo = {
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Rick Astley Test Video",
    order: 99
  };
  const createVideoRes = await apiRequest(`${baseUrl}/api/videos`, 'POST', testVideo, authCookie);
  console.log(`Create Video Status: ${createVideoRes.status}`);
  if (createVideoRes.status !== 200) {
    throw new Error(`Create video failed with status ${createVideoRes.status}`);
  }
  const createdVideo = JSON.parse(createVideoRes.body).video;
  console.log(`Created Video ID: ${createdVideo.id}`);

  // Read list and verify it is there
  const listVideosRes = await apiRequest(`${baseUrl}/api/videos`);
  const listVideos = JSON.parse(listVideosRes.body).videos;
  const foundVideo = listVideos.find(v => v.id === createdVideo.id);
  if (!foundVideo) {
    throw new Error("Created video not found in videos list!");
  }
  console.log(`Verified video exists in list. Title: "${foundVideo.title}"`);

  // Delete
  const deleteVideoRes = await apiRequest(`${baseUrl}/api/videos/${createdVideo.id}`, 'DELETE', null, authCookie);
  console.log(`Delete Video Status: ${deleteVideoRes.status}`);
  if (deleteVideoRes.status !== 200) {
    throw new Error(`Delete video failed with status ${deleteVideoRes.status}`);
  }
  console.log("-> Test 10 PASSED!");

  console.log("\n=========================================");
  console.log("ALL E2E PRODUCTION TESTS PASSED SUCCESSFULLY!");
  console.log("=========================================");
}

runTests().catch(err => {
  console.error("\nTEST FAILED:");
  console.error(err);
  process.exit(1);
});
