from app.websocket.manager_12 import manager
from fastapi import WebSocket,APIRouter,Query,Depends,WebSocketDisconnect
from app.alltocken.tocken_un import verfy_tok
import asyncio
ws = APIRouter()


@ws.websocket("/api/ws/")
async def websocket_endpoint(websocket: WebSocket, tok: str = Query(None)):
    playload = verfy_tok(tok)
    if not playload:
        # refuse connection
        await websocket.close(code=1008)
        return
    print("a connection is found")
    user_id = str(playload["id"])
    await manager.connect(websocket,user_id)
    try:
        while True:
            data = await websocket.receive_json()
            print(data)
            mes = data['message']
            for_user = str(data['to'])
            if data:
                await manager.send_message(user_id,for_user,mes)
            await asyncio.sleep(0.1)
              
    except WebSocketDisconnect:
       await manager.disconnect( websocket,user_id)
    except Exception as e:
        print("WS error:", e)
        await manager.disconnect( websocket,user_id)
    