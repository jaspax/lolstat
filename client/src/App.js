import React, { Component } from 'react';
import './App.css';
import PlayerQuery from './PlayerQuery'
import PlayerDisplay from './PlayerDisplay'
import MatchList from './MatchList'
import Async from 'react-promise';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataPromise: Promise.resolve(null),
            name: '', 
        };
    }

    render() {
      return (
        <div className="App">
            <PlayerQuery onChange={this.loadStats.bind(this)} value={this.state.name} />
            <Async promise={this.state.dataPromise} pending={this.renderPending()}
                then={this.renderLoaded.bind(this)} catch={this.renderError.bind(this)} />
        </div>
      );
    }

    renderPending() {
        return <span className="loading">Loading...</span>;
    }

    renderLoaded(data) {
        if (!data)
            return null;

        return <div className="result-container">
            <PlayerDisplay summoner={data.summoner} />
            <MatchList matches={data.matches} summoner={data.summoner} />
        </div>;
    }

    renderError(err) {
        console.error(err);
        return <div className="error">An error occurred: {err}.<br />(You might need to turn off your ad blocker.)</div>;
    }

    async loadStats(name) {
        this.setState({ 
            name,
            dataPromise: (async() => {
                const response = await window.fetch('/api/stat?q=' + name);
                const body = await response.text();
                const obj = JSON.parse(body);
                return { summoner: obj.summoner, matches: obj.matches };
            })(),
        });
    }
}

export default App;
