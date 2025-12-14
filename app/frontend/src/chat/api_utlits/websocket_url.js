export default function WebSocket_url(){
   const protocol = "ws";
    const host = "127.0.0.1:8000";
    const url = `${protocol}://${host}/api/ws/`; 
    return url;
}