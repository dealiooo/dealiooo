export const devEnv = process.env.REACT_APP_ENV === 'development';

const LOCAL_ADDRESS = 'http://localhost:8000';
const HEROKU_ADDRESS = 'https://dealiooo.herokuapp.com';
export const serverAddress = devEnv ? LOCAL_ADDRESS : HEROKU_ADDRESS;
