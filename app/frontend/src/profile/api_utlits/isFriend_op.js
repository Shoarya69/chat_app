export default async function isFriend(id) {
        const token = localStorage.getItem("token"); // login ke baad token save kar lena
        const res = await fetch("/api/isfriend",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tok: token,friend_id: id })
        });
        const data = await res.json();
        if(data.error){
        //   toast.error("your session is end please try again later")
          return false;
        }
        return data.is_friend === true;
      }