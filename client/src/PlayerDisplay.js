import React from 'react';
import PropTypes from 'prop-types';
import './PlayerDisplay.css';
import { profileIcon } from './util';

function PlayerDisplay(props) {
    return <section className="player-display-container">
        <div className="profile-icon-container">
            <img className="profile-icon" alt="Profile Icon" src={profileIcon(props.summoner.profileIconId)} />
        </div>
        <h1>{props.summoner.name}</h1>
        <span className="level-tag">level</span> <span className="level">{props.summoner.summonerLevel}</span>
    </section>;
}

PlayerDisplay.propTypes = {
    summoner: PropTypes.object.isRequired,
};

export default PlayerDisplay;
