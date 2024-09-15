const getToken = require('./getToken');
const axios = require('axios');

async function getPROFILE(username) {
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

        const inf = response.data.people[0];
        const data = {
            xuid: inf.xuid,
            image: inf.displayPicRaw,
            gamerScore: inf.gamerScore,
            rep: inf.xboxOneRep,
            stats: {
                verified: inf.detail.isVerified,
                followers: inf.detail.followerCount,
                following: inf.detail.followingCount,
                gamepass: inf.detail.hasGamePass,
                tier: inf.detail.accountTier
            }
        }
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


module.exports = getPROFILE