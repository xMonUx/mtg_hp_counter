import { io } from 'socket.io-client';

//zmienne środowiskowe .env NODE_ENV, wyrażenie ternarne, ternary operator 
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL, {
    autoConnect: false
});