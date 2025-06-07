import { WebSocketServer } from "ws";

export function setupWebSocket(httpServer) {
    const wsServer = new WebSocketServer({noServer:true});

    httpServer.on("upgrade", async (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
            wsServer.emit("connection", ws, request);
            console.log("Connection Handshake sucessfull");
        })
    })

    return wsServer
}



