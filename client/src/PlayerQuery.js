import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerQuery.css';

class PlayerQuery extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }

    render() {
        return <div className="player-query-container">
            <input type="text" name="name" placeholder="Enter summoner name" value={this.state.value} onChange={this.onInputChange.bind(this)}></input>
            <button type="submit" onClick={this.onClick.bind(this)}>Go</button>
        </div>;
    }

    onInputChange(e) {
        this.setState({ value: e.target.value });
    }

    onClick(e) {
        this.props.onChange(this.state.value);
    }
}

PlayerQuery.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default PlayerQuery;
