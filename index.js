const path = require('path');
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

        // only take the first 10 matches to help speed things up
        const top10 = matchRefs.slice(0, 10);
        const matches = await Promise.all(top10.matches.map(ref => lol.Match.gettingById(ref.gameId)));
        return res.json({ summoner, matches }).send();
    }
    catch (ex) {
        console.error(ex.message, ex.options);
        return res.status(500).send(ex.message);
    }
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
