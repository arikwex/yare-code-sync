# Code Sync tool (yare-io)
## Setup
This project uses nvm, npm, and grunt. In your terminal/shell, run:
```
# Set node version
nvm i

# Install dependencies
npm i

# Run code-sync server
grunt
```

## Getting Started
Now that the code-sync server up and running, you should verify that things are working as expected, checkout the following two URLs in your browser:
```
http://localhost:4000/code-sync
http://localhost:4000/code-main
```
To use the live code sync, you must first enter a game on `yare.io`. Once the HUD for the game has loaded, run the following command in the browser's dev console:
```
fetch('http://localhost:4000/code-sync').then((r)=>r.json()).then(eval);
```
If everything is working correctly, you'll see a yellow circle in the game area with all your spirits patrolling it randomly. Try changing the `PATROL_RADIUS` to 200 in `client/main.js`. Once you save, the code will automatically update in the running client!

## Custom build targets
If you have a preferred build tool for bundling your code already, you can direct the code-sync server to watch that output file instead. This project includes a demo file, but you can watch any file on your system. Use the following environment variable to configure your build target before running the code-sync server.
```
CUSTOM_CODE_PATH="client/custom_file_demo.js" grunt
```
If the build does not exist at the moment of bootup, the server will crash and complain that the file is missing.

## What's included?
### Code-Sync Server
- Uses port 4000 to serve code-sync script and build target
- Uses port 8001 for websocket connection to publish updates to the browser
- When detecting changes to the build target, pushes notification to browser

### Code bundler
- A simple js bundler using `browserify`
- Entry point is `client/main.js`
- Allows requiring files to keep the code organized

### Render Service
- A specialized protocol that uses the game's `console.log` commands to represent draw calls
- Easily port `client/RenderService.js` in to other builds you may use

#### Render Support
`ping(position: [x, y])`
- Draws a ping animation at the position

`circle(position: [x, y], radius: float, color: string)`
- Draws a circle of given radius and color at position

`line(start: [x, y], end: [x, y], color: string)`
- Draws a line of given color from start to end

`text(position: [x, y], text: string, color: string)`
- Draws a string of given color at position

`log(object: any)`
- JSON.Stringify an object from the bot code and reserialize it in the dev terminal
- This enables persisting logs across ticks for debugging purposes

NOTE: For realtime tracking of spirits, you can pass a spirit in to these draw functions instead of an [x, y] array. Passing in a spirit will make the rendering track smoothly across frames.
