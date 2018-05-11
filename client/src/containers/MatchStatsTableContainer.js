import React, { Component } from 'react';
import _ from 'lodash';
import { fetchSummoner, fetchMatchList, fetchMatch } from '../utils/fetch';
import MatchStatsContainer from './MatchStatsContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';

const testName = `BFY Meowington`;
const retrivalLimit = 10;

const computeResults = async () => {
  let nextState = {
    user: {},
    matchList: [],
    matchData: [],
    computed: [],
    error: null,
  }

  nextState.user = await fetchSummoner(testName).catch(error => {nextState.error = error});
  if (nextState.user) {
    nextState.matchList = await fetchMatchList(nextState.user.accountId, retrivalLimit).catch(error => {nextState.error = error});
  }
  if (nextState.matchList) {
    let gameIDs = nextState.matchList.map(match => {return match.gameId});
    nextState.matchData = await fetchMatch(gameIDs).catch(error => {nextState.error = error});
  }

  if (nextState.matchData) {
    // TODO: if matchData is empty setState(error)

    nextState.matchData.map(match => {
      let computed = {};

      // get participantId from participants
      let participantId;
      for (let identity of match.participantIdentities){
        if (identity.player.summonerName === nextState.user.name){
          participantId = identity.participantId;
          break;
        }
      }

      computed['gameCreation'] = match.gameCreation;
      computed['gameDuration'] = match.gameDuration; // game length
      computed['name'] = nextState.user.name; // summoner name
      computed['win'] = match.participants[participantId-1].stats.win; // win or loose
      computed['gameMode'] = match.gameMode;
      computed['championId'] = match.participants[participantId-1].championId; // champion played
      computed['champLevel'] = match.participants[participantId-1].stats.champLevel; // champion level

      computed['spells'] = []; // summoner spells
      computed['spells'].push(match.participants[participantId-1].spell1Id || 0);
      computed['spells'].push(match.participants[participantId-1].spell2Id || 0);

      computed['items'] = []; // items bought during match
      for (let i = 0; i < 7; i++){
          computed['items'].push(match.participants[participantId-1].stats['item' + i] || 0);
      }

      computed['kills'] = match.participants[participantId-1].stats.kills;
      computed['deaths'] = match.participants[participantId-1].stats.deaths;
      computed['assists'] = match.participants[participantId-1].stats.assists;
      computed['kda'] = (computed['kills'] + computed['assists']) / computed['deaths'] // KDA

      return nextState.computed.push(computed);
    })
    nextState.computed = _.orderBy(nextState.computed, 'gameCreation', 'desc');

  }
  return nextState;
}


class MatchStatsTableContainer extends Component {
  constructor(){
      super();
      this.state = {
        user: {},
        matchList: [],
        matchData: [],
        computed: [],
        loaded: true,
        error: null
      }
  }


  componentDidMount() {
    computeResults()
    .then(res => this.setState(res))
    .then(() => {
      this.setState({loaded: true})
    });
  }

  render() {
    if (this.state.error){
      return <Error error={this.state.error}/>;
    }

    if (!this.state.loaded){
      return (<LoadingSpinner loading={!this.state.loaded} />);
    }

    let toRender = [];
    this.state.computed.map((computed, idx) => {
      return toRender.push(<MatchStatsContainer key={idx} computed={computed}/>)
    })

    return(
      // return multiple matchstats container
      <div>
        {toRender}
      </div>
    );
  }
}

export default MatchStatsTableContainer;
