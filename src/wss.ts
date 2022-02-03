
const WebSocketServer = require('ws').Server;

let wss: typeof WebSocketServer;
let currentConnections: number = 0;
let websocketReady: boolean = false;

module.exports = {
	get ready(): boolean {
		return websocketReady;
	},

	get currentConnections(): number {
		return currentConnections;
	},

	init(server: Express.Application) {
		wss = new WebSocketServer({ server, perMessageDeflate: false });

		wss.on('listening', () => {
			websocketReady = true;
		});

		wss.on('connection', (ws: any) => {
			currentConnections = [...wss.clients].length;
			console.info('Current connections:', currentConnections);

			ws.on('close', (e: Event) => {
				currentConnections = [...wss.clients].length;
				console.info('Current connections:', [...wss.clients].length);
			});

			setInterval(() => {
				if ([...wss.clients].length > 0) {
					ws.send(JSON.stringify({
						"time": `${new Date().toISOString().replace(/^[^T]+T/g, '').slice (0,-5)}`,
						"pod": process.env.KUBERNETES_POD_NAME || '-',
						"node": process.env.KUBERNETES_NODE_NAME || '-',
						"clients": [...wss.clients].length
					}));
				}
			}, 1000);
		});
	},

  close() {
    websocketReady = false;
    console.log('Closing websockets server');
  },
};