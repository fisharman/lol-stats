import React from 'react';
import ReactDOM from 'react-dom';
import MatchStats from './MatchStats';

const mockState = {
  user: {
    accountId: 31649572,
    id: 585897,
    name: "RiotSchmick",
    profileIconId: 746,
    revisionDate: 1525828291000,
    summonerLevel: 86
  },
  computed : {
    assists: 17,
    champLevel: 15,
    championId: 53,
    championImg: "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/champion/Blitzcrank.png",
    deaths: 3,
    gameCreation: 1525746127770,
    gameDuration: 1054,
    gameMode: "ARAM",
    items: [3073,3025,3111,1011,0,0,2052],
    itemsImg: [
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/3073.png",
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/3025.png",
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/3111.png",
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/1011.png",
      "",
      "",
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/2052.png"],
    kda: 6.333333333333333,
    kills: 2,
    name: "RiotSchmick",
    spells: [32, 4],
    spellsImg: ["http://ddragon.leagueoflegends.com/cdn/8.9.1/img/spell/SummonerSnowball.png",
      "http://ddragon.leagueoflegends.com/cdn/8.9.1/img/spell/SummonerFlash.png"],
    win: true
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MatchStats {...mockState.computed} />, div);
});
