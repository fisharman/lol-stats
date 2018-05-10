import axios from 'axios';

export const fetchSummoner = async (name) => {
  const summonerBaseUrl = `/lol/summoner/v3/summoners/by-name/`;

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

export const fetchMatchList = async (matchID, endIndex) => {
  const matchListBaseUrl = `/lol/match/v3/matchlists/by-account/`

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

export const fetchMatch = async (gameIDs) => {
  // TODO: order the response according to gameIDs
  // TODO: split fetch so limit is not hit
  const matchBaseUrl = `/lol/match/v3/matches/`;

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

export const fetchChampionImageById = async(championID) => {
  const championBaseUrl = `/static-data/v3/champions/`;
  const imgBaseUrl = `http://ddragon.leagueoflegends.com/cdn/8.9.1/img/champion/`;

  let url = championBaseUrl + championID;
  let params = {params: {locale: 'en_US', champData: 'image'}};
  let imgName, data;

  await axios.get(url, params)
  .then( res => {
    imgName = res.data.image.full;
  })
  .catch( error => {
    return Promise.reject(error);
  })

  if (imgName){
    await axios.get(imgBaseUrl + imgName)
    .then( res => {
      data = res.data;
    })
    .catch( error => {
      return Promise.reject(error);
    })
  }

  return data;
}

export const fetchSpellImageById = async(spellID) => {
  const spellBaseUrl = `/static-data/v3/summoner-spells/`;
  const imgBaseUrl = `http://ddragon.leagueoflegends.com/cdn/8.9.1/img/spell/`;

  let url = spellBaseUrl + spellID;
  let params = {params: {locale: 'en_US', spellData: 'image'}};
  let imgName, data;

  await axios.get(url, params)
  .then( res => {
    imgName = res.data.image.full;
  })
  .catch( error => {
    return Promise.reject(error);
  })

  if (imgName){
    await axios.get(imgBaseUrl + imgName)
    .then( res => {
      data = res.data;
    })
    .catch( error => {
      return Promise.reject(error);
    })
  }

  return data;
}

export const fetchItemImageById = async(itemID) => {
  const runesBaseUrl = `/static-data/v3/items/`;
  const imgBaseUrl = `http://ddragon.leagueoflegends.com/cdn/8.9.1/img/item/`;

  let url = runesBaseUrl + itemID;
  let params = {params: {locale: 'en_US', itemData: 'image'}};
  let imgName, data;

  await axios.get(url, params)
  .then( res => {
    imgName = res.data.image.full;
  })
  .catch( error => {
    return Promise.reject(error);
  })

  if (imgName){
    await axios.get(imgBaseUrl + imgName)
    .then( res => {
      data = res.data;
    })
    .catch( error => {
      return Promise.reject(error);
    })
  }

  return data;
}
