const express = require('express');
require('express-yields');
const LeagueJs = require('leaguejs');

const app = express();
app.set('port', (process.env.PORT || 5000));

const lol = new LeagueJs(process.env.LEAGUE_API_KEY);

app.use(express.static('static')); // static html
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/api/stat', async (req, res) => {
    const player = req.query.q;
    if (!player)
        return res.status(401).send();

    try {
        const summoner = await lol.Summoner.gettingByName(player);
        const matchRefs = await lol.Match.gettingRecentListByAccount(summoner.accountId);
        const matches = await Promise.all(matchRefs.matches.map(ref => lol.Match.gettingById(ref.gameId)));
        return res.json({ summoner, matches }).send();
    }
    catch (ex) {
        console.error(ex.message, ex.options);
        return res.status(500).send(ex.message);
    }
});
