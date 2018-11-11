import React from 'react';
import PropTypes from 'prop-types';
import './MatchList.css';

import MatchDisplay from './MatchDisplay';

function MatchList(props) {
    return <section className="match-list-container">
        {props.matches.map(match => <MatchDisplay key={match.gameId} match={match} summoner={props.summoner} />)}
    </section>;
}

MatchList.propTypes = {
    matches: PropTypes.array.isRequired,
    summoner: PropTypes.object.isRequired,
};

export default MatchList;

