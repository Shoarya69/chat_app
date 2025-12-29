export default function WebSocket_url(){
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.host; 
    const url = `${protocol}://${host}/api/ws/`; 
    return url;
}