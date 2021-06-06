const host = require('./host-service');
const { AwesomeWebSocket } = require('awesome-websocket');
const { EventEmitter } = require('events');

class LiveSocket extends EventEmitter {
  constructor() {
    super();
    window._LiveSocket?.close()
    this.ws = new AwesomeWebSocket(`ws://${host.addr}:8001/`);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMsg.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  onOpen() {
    console.log('Live Socket Opened!')
  }

  onMsg(evt) {
    const msg = JSON.parse(evt.data);
    this.emit(msg.type, msg.payload);
  }

  send(data) {
    this.ws.send(data);
  }

  onClose() {
    console.log('Live Socket Closed!');
  }

  close() {
    this.ws?.close();
  }
}

// Export singleton live socket
const ls = new LiveSocket();
window._LiveSocket = ls
module.exports = ls