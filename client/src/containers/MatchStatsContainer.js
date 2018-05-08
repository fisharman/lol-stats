import React, { Component } from 'react';
import { fetchSummoner, fetchMatchList, fetchMatch } from '../utils/fetch';
import Error from '../components/Error';

const testName = `RiotSchmick`;
const retrivalLimit = 3;

const computeResults = async () => {
  let nextState = {
    user: {},
    matchList: [],
    matchData: {},
    computed: {},
    error: null,
  };

  // TODO: separate out error from nextState

  nextState.user = await fetchSummoner(testName).catch(error => {nextState.error = error});
  if (nextState.user) {
    nextState.matchList = await fetchMatchList(nextState.user['accountId'], retrivalLimit).catch(error => {nextState.error = error});
  }
  if (nextState.matchList) {
    let gameIDs = nextState.matchList.map(match => {return match['gameId']});
    nextState.matchData = await fetchMatch(gameIDs).catch(error => {nextState.error = error});
  }

  if (nextState.matchData) {
    // TODO: make sure matchData is not empty
    console.log(nextState.matchData);
    //

  }else{
    // return error object
    return nextState;
  }

}


class MatchStatsContainer extends Component {
  constructor(){
      super();
      this.state = {
        user: {},
        matchList: [],
        matchData: {},
        computed: {},
        loaded: false,
        error: null
      }
  }

  // fetch data here
  componentDidMount() {
    computeResults()
    .then(res => this.setState(res));
  }

  render() {
    let content = this.state.error ?
    <Error
      error={this.state.error}
    /> : "";

    return(
      <div>{content}</div>
    );
  }
}

export default MatchStatsContainer;
