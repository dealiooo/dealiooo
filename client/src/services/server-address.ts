import { devEnv } from '../utils';

const LOCAL_ADDRESS = 'http://localhost:8000';
const HEROKU_ADDRESS = 'https://dealiooo.herokuapp.com';

const serverAddress = devEnv ? LOCAL_ADDRESS : HEROKU_ADDRESS;

export default serverAddress;
