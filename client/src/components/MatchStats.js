import React from 'react';
import './MatchStats.css';
import moment from 'moment';

const GameStats = props => {
  let duration = moment.duration(props.gameDuration, 's');
  let win = props.win ? "Victory": "Defeat";
  return(
    <div className="col game-stats">
      <div className="summoner-name">{props.name || ""}</div>
      <div className="game-mode">{props.gameMode || ""}</div>
      <div className="game-creation">{moment(props.gameCreation).fromNow() || ""}</div>
      <div className={win}>{win}</div>
      <div className="game-duration">{duration.minutes() + "m " + duration.seconds() + "s"}</div>
    </div>
  );
}

const GameSettingInfo = props => {
  return(
    <div className="col game-setting-info">
      <div className="row">
        <img className="rounded col championImg" src={props.championImg || ''} alt="Champion"/>
        <div className="col spells">
          <img className="row rounded spell1" src={props.spellsImg ? props.spellsImg[0] : ''} alt="Spell 1"/>
          <img className="row rounded spell2" src={props.spellsImg ? props.spellsImg[1] : ''} alt="Spell 2"/>
        </div>
      </div>
    </div>
  );
}

const Stats = props => {
  return(
    <div className="col stats">
      <div className="champlevel">Champion Level: {props.champLevel}</div>
      <div className="kda">{props.kills || ''}/<span className="text-death">{props.deaths || ''}</span>/{props.assists || ''}</div>
      <div className="kdar">{props.kda.toFixed(2)+ ':1' || ""}<span className="text-muted"> KDA</span></div>
    </div>
  );
}

const Items = props => {
  let images = [];
  if (props.itemsImg){
    for (let i = 0; i < 7; i++){
      if (props.itemsImg[i]){
        images.push(<img key={i} className="rounded items-img" src={props.itemsImg[i]} alt="Item Img"/>)
      }
    }
  }

  return(
    <div className="col-md-3 game-setting-info">
      {images}
    </div>
  );
}

const MatchStats = props => {
  return(
    <div className="container">
      <div className="border rounded match-stats-box row">
          <GameStats
              name = {props.name}
              gameMode = {props.gameMode}
              gameCreation = {props.gameCreation}
              win = {props.win}
              gameDuration = {props.gameDuration}
          />
          <GameSettingInfo
              championImg = {props.championImg}
              spellsImg = {props.spellsImg}
          />
          <Stats
              champLevel = {props.champLevel}
              kills = {props.kills}
              deaths = {props.deaths}
              assists = {props.assists}
              kda = {props.kda}
          />
          <Items
              itemsImg = {props.itemsImg}
          />
      </div>
    </div>
  )
}

export default MatchStats;
