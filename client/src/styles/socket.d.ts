import { Socket } from 'socket.io';

interface CustomSocket extends Socket {
    userId?: string;
}

export default CustomSocket;
