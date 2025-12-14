export default async function Fetchmessage(token,id){
    let res = await fetch(`/api/chat_get?tok=${token}&friend_id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data = await res.json();

    if (data.message) {
        return data;
    }
    if(data.NoMs){
        return {"NoMs": data.NoMs};
    }
    if (data.error  === true){
        return {"error": data.error};
    }
    return [];
}
