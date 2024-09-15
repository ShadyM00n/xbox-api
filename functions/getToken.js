const pris = require('prismarine-auth');

async function getToken() {
    await new Promise(resolve => setTimeout(resolve, 100))
    const flow = new pris.Authflow(undefined, "./auth", {
        flow: 'live',
        authTitle: pris.Titles.MinecraftNintendoSwitch
    });
    const data = await flow.getXboxToken("http://xboxlive.com")
    return `XBL3.0 x=${data.userHash};${data.XSTSToken}`
}

module.exports = getToken;