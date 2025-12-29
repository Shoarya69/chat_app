export default async function Accept_api(tocken,id,username,accept){
    try{
        const data =await fetch("/api/notfi_pop", {
            method: "POST",
            headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tok : tocken,
                        friend_id: id,
                        friend_username: username,
                        Accept: accept
                    })
                    });
                    const res = await data.json(); // 🔥 CONVERT RESPONSE TO JSON
                    console.log(res);
                    return res;
            
    }catch(err){
        console.log(err);
        return {"error": "Someting is not working in this api"}
    }
}