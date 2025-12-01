// Socket.io Service for realtime notifications
import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    if (this.socket?.connected) {
      return this.socket;
    }

    if (this.socket) {
      this.socket.disconnect();
    }

    const serverURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    this.socket = io(serverURL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log(`✅ Socket connected successfully for user`);
    });

    this.socket.on("disconnect", (reason) => {
      console.log(`❌ Socket disconnected:`, reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error(`❌ Socket connection error:`, error.message);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  get isConnected() {
    return this.socket?.connected || false;
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }
}

export default new SocketService();
