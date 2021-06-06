const host = require('./host-service');
const LiveSocket = require('./live-socket');

class AutoUpdater {
  constructor() {
    LiveSocket.on('code-update', this.requestNewCode.bind(this));
    this.statusElement = document.createElement('div');
    this.configureHUD();
    this.requestNewCode();
  }

  configureHUD() {
    document.querySelector('#panel').style.display = 'none';
    document.querySelector('#switch_view').style.display = 'none';
    document.querySelector('#shortcut_info').style.display = 'none';
    document.querySelector('#update_code').style.display = 'none';
    document.querySelector('body').appendChild(this.statusElement);
    this.statusElement.style.position = 'fixed';
    this.statusElement.style.left = '20px';
    this.statusElement.style.bottom = '20px';
    this.statusElement.style.background = '#222';
    this.statusElement.style.padding = '10px';
  }

  updateStatus(text) {
    this.statusElement.innerHTML = text;
  }

  genRandomHex(size) {
    return [...Array(size)].map(() => {
      return Math.floor(Math.random() * 16).toString(16)
    }).join('');
  }

  async requestNewCode() {
    this.updateStatus(`[${new Date().toISOString()}] Updating code... `);
    const res = await fetch('http://localhost:4000/code-main');
    const code = await res.json();
    const versionPrefix = `var CODE_VERSION = '${this.genRandomHex(8)}';`;
    window.editor.selectAll();
    window.editor.remove();
    window.editor.insert(versionPrefix + code);
    document.querySelector('#update_code').click();
    this.updateStatus(`[${new Date().toISOString()}] Updated code! Size ${(code.length/1024.0).toFixed(1)}kB`);
  }
}

// Auto-updater singleton
const au = new AutoUpdater();
module.exports = au;