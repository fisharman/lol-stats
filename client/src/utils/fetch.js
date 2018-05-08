import axios from 'axios';

const summonerBaseUrl = `/lol/summoner/v3/summoners/by-name/`;

export const fetchSummoner = async (name) => {
  let url = summonerBaseUrl + name;
  let data = {};

  await axios.get(url)
  .then( res => {
    data = res.data;
  })
  .catch( error => {

    return Promise.reject(error);
  })

  return data;
}

const matchListBaseUrl = `/lol/match/v3/matchlists/by-account/`

export const fetchMatchList = async (matchID, endIndex) => {
  let url = matchListBaseUrl + matchID;
  let params = {params: {endIndex: endIndex}};
  let data = [];

  await axios.get(url, params)
  .then( res => {
    data = res.data.matches;
  })
  .catch( error => {
    return Promise.reject(error);
  })

  return data;
}

const matchBaseUrl = `/lol/match/v3/matches/`;

export const fetchMatch = async (gameIDs) => {
  // TODO: order the response according to gameIDs

  let data = [];
  let promises = [];
  gameIDs.forEach(id => {
      promises.push(axios.get(matchBaseUrl+id));
  });

  await Promise.all(promises)
  .then(res => {
    data = res.map(data => data.data)
  })
  .catch(error => Promise.reject(error));

  return data;
}
