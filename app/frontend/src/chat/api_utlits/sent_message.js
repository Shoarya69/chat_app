export default async function SendMessage_api(tok,id,text){
        const data = await fetch("/api/chat_save",{method : "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({
                tok : tok,
                friend_id: id,
                text: text,
      })
        });
        const res = await data.json();
        if(res.Success){
            console.log("Successfully Sent the message");   
            return {"Success": true}
        }
        if(res.error){
            console.log("Something Went Wrong");
            return {"error":true};
        }

}