const getToken = require('./getToken');
const axios = require('axios');

async function getXUID(username) {
    try {
        const response = await axios({
            url: `https://peoplehub.xboxlive.com/users/me/people/search/decoration/detail?q=${username}&maxItems=1`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                'accept-language': 'en-US',
                Connection: 'Keep-Alive',
                'Accept-Encoding': 'gzip',
                'x-xbl-contract-version': "5",
                'User-Agent': 'okhttp/4.9.1',
                authorization: await getToken(),
            }
        });

        const gamerData = response.data.people[0].xuid;
        return gamerData;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


module.exports = getXUID