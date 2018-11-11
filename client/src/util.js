const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/8.20.1';

const champions = require('./lol-static/championFull.json');
const summoner = require('./lol-static/summoner.json');
const items = require('./lol-static/item.json');

export function profileIcon(id) {
    return `${baseUrl}/img/profileicon/${id}.png`;
}

export function spellIcon(id) {
    // eslint-disable-next-line
    const spell = Object.values(summoner.data).find(c => c.key == id);
    return `${baseUrl}/img/spell/${spell.image.full}`;
}

export function runeIcon(id) {
    return `${baseUrl}/img/rune/${id}.png`;
}

export function item(id) {
    return items.data[id];
}

export function itemIcon(it) {
    return `${baseUrl}/img/item/${it.image.full}`;
}

export function champion(id) {
    // eslint-disable-next-line
    return Object.values(champions.data).find(c => c.key == id);
}

export function championIcon(champion) {
    return `${baseUrl}/img/champion/${champion.image.full}`;
}
