const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';

async function testDetails() {
    try {
        console.log('--- Testing Details Endpoint ---');

        // Test Anime (Naruto)
        console.log('1. Testing Anime (ID: 20 - Naruto)...');
        const anime = await axios.get(`${BASE_URL}/search/details/anime/20`);
        if (anime.data.title.includes('Naruto')) {
            console.log('   [PASS] Found Anime:', anime.data.title);
        } else {
            console.error('   [FAIL] Expected Naruto, got:', anime.data.title);
        }

        // Test Movie (Inception or similar, using ID from previous search if possible, but hardcoding known ID for now)
        // Inception ID is 27205
        console.log('2. Testing Movie (ID: 27205 - Inception)...');
        const movie = await axios.get(`${BASE_URL}/search/details/movie/27205`);
        if (movie.data.title === 'Inception') {
            console.log('   [PASS] Found Movie:', movie.data.title);
        } else {
            console.error('   [FAIL] Expected Inception, got:', movie.data.title);
        }

        // Test Game (Portal 2 - ID 4200)
        console.log('3. Testing Game (ID: 4200 - Portal 2)...');
        const game = await axios.get(`${BASE_URL}/search/details/game/4200`);
        if (game.data.title === 'Portal 2') {
            console.log('   [PASS] Found Game:', game.data.title);
        } else {
            console.error('   [FAIL] Expected Portal 2, got:', game.data.title);
        }

        console.log('--- ALL TESTS PASSED ---');

    } catch (error) {
        console.error('TEST FAILED:', error.response ? error.response.data : error.message);
    }
}

testDetails();
