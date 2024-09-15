const express = require('express');
const app = express();
const config = require('./config.json');
const { getPROFILE, getXUID, getUSERNAME, getGAMES, getACTIVITY } = require('./functions/exports');


app.get('/V1/players/profile', async (req, res) => {
    const username = req.query.p;
    if (!username) return res.json({ content: 'Missing username' });
    const data = await getPROFILE(username);
    if (!data) return res.json({ content: null });

    return res.json({ content: data})
})

app.get('/V1/players/xuid', async (req, res) => {
    const username = req.query.p;
    if (!username) return res.json({ content: 'Missing username' });
    const data = await getXUID(username);
    if (!data) return res.json({ content: null });

    return res.json({ content: data })
})

app.get('/V1/players/username', async (req, res) => {
    const xuid = req.query.x;
    if (!xuid) return res.json({ content: 'Missing xuid' });
    const data = await getUSERNAME(xuid);
    if (!data) return res.json({ content: null });

    return res.json({ content: data })
})

app.get('/V1/games/list', async (req, res) => {
    const username = req.query.p;
    if (!username) return res.json({ content: 'Missing username' });
    const data = await getGAMES(username);
    if (!data) return res.json({ content: null });

    return res.json({ content: data })
})

app.get('/V1/games/find', async (req, res) => {
    const username = req.query.p;
    const id = req.query.i;
    if (!id) return res.json({ content: `Missing game-id` })
    if (!username) return res.json({ content: 'Missing username' });
    const data = await getGAMES(username);
    if (!data) return res.json({ content: null });
    
    let game = {};

    data.forEach(inst => {
        if (inst.id === id) game = inst;
    })

    if (!game || game == {}) return res.json({ content: 'User does not own game'});

    return res.json({ content: {
        game
    }});
})

app.get('/V1/actv/req', async (req, res) => {
    const xuid = req.query.x;
    if (!xuid) return res.json({ content: 'Missing xuid' });
    const data = await getACTIVITY(xuid);
    if (!data) return res.json({ content: null });
    
    return res.json({ content: data});
})


app.get('/V1', (req, res) => {
    return res.json({
        paths: [
            "/players/profile",
            "/players/xuid",
            "/players/username",
            "/games/list",
            "/games/find",
        ]
    })
})

app.get('/V1/games', (req, res) => {
    return res.json({
        paths: [
            "/list",
            "/find",
        ]
    })
})

app.get('/V1/playes', (req, res) => {
    return res.json({
        paths: [
            "/xuid",
            "/username",
            "profile"
        ]
    })
})

app.get('*', (req, res) => {
    res.redirect('/V1/')
})

app.listen(config.port, () => {
    console.log(`Started at http://localhost:${config.port}`)
})