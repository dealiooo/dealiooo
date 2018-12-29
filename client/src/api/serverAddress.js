const connectionType = 'http://';
const website = 'localhost';
const portNum = ':8000';

const herokuAddress = 'https://team-h.herokuapp.com/';

const HEROKU = false;

module.exports = HEROKU ? herokuAddress : connectionType + website + portNum;
