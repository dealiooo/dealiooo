const connectionType = 'http://'
const website = 'localhost'
const portNum = ':8000'

const herokuAddress = 'https://dealiooo.herokuapp.com/'

const HEROKU = true

module.exports = HEROKU ? herokuAddress : connectionType + website + portNum
