import React, { Component } from 'react';
import { fetchChampionImageById, fetchSpellImageById, fetchItemImageById } from '../utils/fetch';
import MatchStats from '../components/MatchStats';

const getImageLinks = async (championId, spells, items) => {
  let rtObj = {
    championImg: '',
    itemsImg: [],
    spellsImg: []
  }
  let itemsPromises = [];
  let spellsPromises = [];

  rtObj.championImg = await fetchChampionImageById(championId);

  spellsPromises = spells.map(spell => {
    return fetchSpellImageById(spell);
  })

  itemsPromises = items.map(item => {
    return fetchItemImageById(item);
  })

  await Promise.all(spellsPromises)
  .then(res => {
    rtObj.spellsImg = res.map(data => data)
  })

  await Promise.all(itemsPromises)
  .then(res => {
    rtObj.itemsImg = res.map(data => data)
  })

  return rtObj;
}

class MatchStatsContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.props.computed;

  }


  componentDidMount(){
    getImageLinks(this.state.championId, this.state.spells, this.state.items)
    .then(res => this.setState(res))
  }

  render(){
    return(
      <MatchStats {...this.state}/>
    );
  }
}

export default MatchStatsContainer;
