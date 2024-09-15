const getToken = require('./getToken');
const axios = require('axios');

async function getACTIVITY(xuid) {
    if (!xuid) return null;
    
    try {
        const response = await axios({
            url: `https://peoplehub.xboxlive.com:443/users/xuid(${xuid})/people/social/decoration/multiplayersummary,preferredcolor`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                'accept-language': 'en-US',
                Connection: 'Keep-Alive',
                'Accept-Encoding': 'gzip',
                'x-xbl-contract-version': "2",
                'User-Agent': 'okhttp/4.9.1',
                authorization: await getToken()
            }
        });
       
        let data = response.data;
        console.log(data)
        return data;

        
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


module.exports = getACTIVITY