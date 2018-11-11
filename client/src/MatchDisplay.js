import React from 'react';
import PropTypes from 'prop-types';
import './MatchDisplay.css';

import prettyMs from 'pretty-ms';
import { spellIcon, champion, championIcon, item, itemIcon } from './util';

function MatchDisplay(props) {
    // Extract relevant information from the complicated data object
    const match = props.match;

    const participantId = match.participantIdentities.find(id => id.player.summonerId === props.summoner.id);
    const participant = match.participants.find(p => p.participantId === participantId.participantId);
    const startTime = new Date(match.gameCreation).toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const duration = prettyMs(match.gameDuration * 1000);

    const stats = participant.stats;
    const sumSpells = [participant.spell1Id, participant.spell2Id];
    const sumRunes = participant.runes || [];
    const champId = participant.championId;
    const champ = champion(champId);

    const kda = ((stats.kills + stats.assists) / stats.deaths);
    const items = [...Array(6).keys()].map(i => item(stats['item'+i])).filter(i => i);
    const creepDeltas = Object.values(participant.timeline.creepsPerMinDeltas || {});
    const totalCreeps = creepDeltas.reduce((acc, cum) => acc + cum * 10, 0);
    const creepsPerMin = (totalCreeps / (match.gameDuration / 60));

    return <section className="match-container">
        <div className="match-outcome">
            <div className="title">Outcome</div>
            <div className={stats.win ? "match-win" : "match-loss"}>{stats.win ? "Victory" : "Defeat" }</div>
            <div className="duration">{duration}</div>
            <div className="start-time">Start time: {startTime}</div>
        </div>
        <div className="champion-group">
            <div className="title">Champion</div>
            <div className="champion-row">
                <img className="champion-icon" alt={champ.name} src={championIcon(champ)} />
                <span className="champ-name">{champ.name}</span><br />
                <span className="champ-level">level {stats.champLevel}</span>
            </div>
            <div className="champion-row">Spells<br />
                {sumSpells.map(s => <img className="spell-icon" key={match.gameId+s} alt={s} src={spellIcon(s)} />)}
            </div>
            <div className="champion-row">Runes<br />
                {sumRunes.map(r => <span className="rune-id" key={match.gameId+r.runeId}>Rune {r.runeId} rank {r.rank}</span>)}
            </div>
        </div>
        <div className="item-group">
            <div className="title">Items</div>
            {items.map(i => <div key={match.gameId+i.name} className="item-row"><img alt={i.name} src={itemIcon(i)} /><span className="item-name">{i.name}</span></div>)}
        </div>
        <div className="score-group">
            <div className="title">Score</div>
            <p>KDA: {kda.toFixed(2)}</p>
            <p>Creep score: {totalCreeps.toFixed(0)}</p>
            <p>Creeps/min: {creepsPerMin.toFixed(2)}</p>
        </div>
    </section>;
}

MatchDisplay.propTypes = {
    match: PropTypes.object.isRequired,
    summoner: PropTypes.object.isRequired,
};

export default MatchDisplay;

