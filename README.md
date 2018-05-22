# Match Statistics Displays for League of Legends
Stack:
- Front-end: React.js
- Back-end: Node.js (For serving static requests and forwarding of dynamic requests. Needed due to Riot API forbids CORS and rate limiting issues)

## Prerequisites
1.  Install [npm](https://www.npmjs.com/)
2.  Install [node](https://nodejs.org/en/)

## Install Dependencies
Clone project, then in the main project folder run command:
```
npm install
```
This will install NPM packages for the Node server, then go to `client/` and again type:
```
npm install
```
This will install NPM packages for the React project

## Change API Key
**IMPORTANT**<br> 
API key is NOT included for security reasons.  
Supply a valid Riot API key into [/apiKey.js](apiKey.js#L1) file in the form of `'RGAPI-...........'` before `npm run start` or else you will get server error.

## Change Search Summoner and Matches Returned
The search target and number of matches reutrned is currently hard coded. To change, edit the following file:<br>
[/client/src/containers/MatchStatsTableContainer.js](/client/src/containers/MatchStatsTableContainer.js#L8)

## Available Scripts

In main project directory (not client), you can run:

### `npm run start`

This will start both Node and React app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Preview
![Render Sample](/static/lol-stats-screen.jpg)