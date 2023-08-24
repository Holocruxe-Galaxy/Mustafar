import { Manager } from "socket.io-client";
import { Dispatch } from 'redux'
import { addMessageToChat, saveId } from "src/store/apps/chat";

class SocketClient {
  socket: any;

  connect(dispatch: Dispatch<any>) {
    const manager = new Manager(`${process.env.NEXT_PUBLIC_MANDALORE}/socket.io/socket.io.js`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem('AuthorizationToken')}`
      }
    });
  
    this.socket?.removeAllListeners();
    this.socket = manager.socket('/');
  
    this.socket.on('connection', () => dispatch(saveId(this.socket.id)));
  }

  sendMessage(message: string) {
    this.socket?.emit('clientChat', { message })
  }

  recieveMessages(dispatch: Dispatch<any>) {
    this.socket?.on('clientChat', (res: any) => dispatch(addMessageToChat(res)))
  }

  recieveBroadcast(dispatch: Dispatch<any>) {
    this.socket?.on('broadcast', (res: any) => dispatch(addMessageToChat(res)))
  }
}

export const socketClient = new SocketClient();