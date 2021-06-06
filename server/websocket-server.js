const provider = require('./provider');
const ws = require('nodejs-websocket');

console.log('Starting websocket server...')

servers = {}

server = ws.createServer((conn) => {
  console.log('New connection');

  conn.on('close', (code, reason) => {
    console.log('Connection closed');
  });

  conn.on('error', () => {
    console.log('Connection error');
  });

  conn.sendEvent = (type, payload = {}) => {
    const data = {};
    data.type = type;
    data.payload = payload;
    conn.sendText(JSON.stringify(data));
  };
})
.listen(8001);

provider.onNewBuild(() => {
  console.log('New build detected!')
  server.connections.forEach((conn) => {
    conn.sendEvent('code-update');
  });
});
