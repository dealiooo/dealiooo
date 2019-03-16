

const connectionType = 'http://'
const website = 'localhost'
const portNum = ':8000'

const herokuAddress = 'https://dealiooo.herokuapp.com/'

module.exports = process.env.REACT_APP_LOCAL_SERVER ? connectionType + website + portNum : herokuAddress
