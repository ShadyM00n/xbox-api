const getToken = require('./getToken');
const axios = require('axios');
const getXUID = require('./getXUID');

async function getGAMES(username) {
    const xuid = await getXUID(username);
    if (!xuid) return null;
    
    try {
        const response = await axios({
            url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,scid`,
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
        let data = [response.data];
        console.log(data[0].titles)
        let info = data[0].titles.map(game => ({
            name: game.name,
            image: game.displayImage,
            history: game.titleHistory,
            id: game.titleId,
            achievements: {
                earned: game.achievement.currentAchievements,
                total: game.achievement.totalAchievements
            }
        }))
        return info;

        
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


module.exports = getGAMES