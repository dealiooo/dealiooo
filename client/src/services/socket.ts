import io from 'socket.io-client';

import serverAddress from './server-address';

// Global Socket IO Client
//
// Note: history.push() is async so when you try to close socket or remove listeners during an
// components will unmount sequence, unreliable things can happen.
//
// for example, the new component pushed onto the history stack may already be mounted
// and if it uses the same socket instance, the client socket may no longer exist due to not
// knowing when the component will unmount is fired on the previous component which means
// if a socket call is made to the server socket
// the client socket may already be closed by the time the server socket sends back data
//
// for now, its better to:
// 1. do not close the socket
// 2. remove listeners on will unmount
export let socket = io(serverAddress, { autoConnect: true, forceNew: true });

// When a user logs in the socket will not update
// which means socket.request.session.passport.user will always be {}
// to solve this we have to force a new connection
// so when user signs in this will be called
export const refreshSocketConnection = () => {
  socket.close();
  socket = io.connect(serverAddress, { forceNew: true });
};
