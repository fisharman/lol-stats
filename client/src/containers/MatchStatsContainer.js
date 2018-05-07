import React, { Component } from 'react';
import { fetchSummoner } from '../utils/fetchSummoner';


class MatchStatsContainer extends Component {
  // fetch data here
  componentDidMount() {
    console.log(fetchSummoner());
  }

  render() {
    return(
      <div/>
    );
  }
}

export default MatchStatsContainer;
