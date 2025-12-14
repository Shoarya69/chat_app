

export async function WebSocket_api(token) {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = "127.0.0.1:8000";
    const url = `${protocol}://${host}/api/ws/?tok=${encodeURIComponent(token)}`;

    return new Promise((resolve, reject) => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WS connected");
            resolve(ws);
        };

        ws.onerror = (err) => reject(err);
    });
}
