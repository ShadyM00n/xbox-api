const getToken = require('./getToken');
const axios = require('axios');

async function getUSERNAME(xuid) {
    try {
        const response = await axios({
            url: `https://peoplehub.xboxlive.com:443/users/me/people/xuids(${xuid})/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
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

        const data = response.data.people[0]
        return data.gamertag;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


module.exports = getUSERNAME