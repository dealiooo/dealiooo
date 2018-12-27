const request = require('./request');
const resolvePendingPromise = require('./resolvePendingPromise');

module.exports = {
    getMainLobby: () => request('/main-lobby', {}, 'get'),
    postMainLobby: () => request('/main-lobby', {}).then(resolvePendingPromise),
    postMainLobbyChat: ({ message }) => request('/main-lobby/chat', { message }),
    postMainLobbyCreateGame: playerCapacity =>
    request('/main-lobby/create-game', { playerCapacity }).then(
        resolvePendingPromise
    )
}