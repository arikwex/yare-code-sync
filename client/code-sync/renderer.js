class Renderer {
  constructor() {
    this.interceptRenderer();
    this.logMap = {};
  }

  interceptRenderer() {
    if (window.originalRender === undefined) {
      window.originalRender = render_state;
    }

    window.render_state = (timestamp) => {
      originalRender(timestamp);
      this.customRender();
    };
  }

  customRender() {
    const ctx = c;
    if (ctx === undefined) {
      return;
    }
    const consoleElement = document.querySelector('#console');
    if (consoleElement == null) {
      return;
    }
    const consoleLines = consoleElement.innerText.split('\n').forEach((line) => {
      if (line.length > 0) {
        this.handleLine(line.trim(), ctx);
      }
    });
  }

  handleLine(line, ctx) {
    const args = line.split('@');
    if (args[0] != 'RENDER') { return; }
    args.shift();

    const renderType = args[0];
    args.shift();

    if (renderType == 'CIRCLE') {
      this.renderCircle(ctx, {
        x: eval(args[0]),
        y: eval(args[1]),
        radius: parseFloat(args[2]),
        color: args[3]
      });
    } else if (renderType == 'PING') {
      this.renderPing(ctx, {
        x: eval(args[0]),
        y: eval(args[1]),
        timestamp: parseInt(args[2])
      });
    } else if (renderType == 'LINE') {
      this.renderLine(ctx, {
        x0: eval(args[0]),
        y0: eval(args[1]),
        x1: eval(args[2]),
        y1: eval(args[3]),
        color: args[4]
      });
    } else if (renderType == 'TEXT') {
      this.renderText(ctx, {
        x: eval(args[0]),
        y: eval(args[1]),
        str: args[2],
        color: args[3]
      });
    } else if (renderType == 'PLOG') {
      const logId = args[1];
      if (this.logMap[logId] === undefined) {
        this.logMap[logId] = true;
        console.log(JSON.parse(args[1]));
      }
    }
  }

  renderLine(ctx, {x0, y0, x1, y1, color}) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x0, y0);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  renderCircle(ctx, {x, y, radius, color}) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  renderPing(ctx, {x, y, timestamp}) {
    const dT = Math.max((Date.now() - 1000 - timestamp) * 0.001, 0);
    const alpha = Math.exp(-dT * 3.0);
    const radius = 40 * (1 - alpha);
    ctx.strokeStyle = `rgba(255, 100, 100, ${alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  renderText(ctx, {x, y, str, color}) {
    ctx.font = '12px courier';
    ctx.fillStyle = color;
    const lines = str.split('\\n');
    for (let i = 0; i < lines.length; i++) {
      c.fillText(lines[i], x, y + (i * 13));
    }
  }
}

module.exports = new Renderer();
