import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import isFriend from "./api_utlits/isFriend_op";
export default function UserProfile() {
    const [user_name,setname]= useState("");
    const [isFriendState, setIsFriendState] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch(`/api/user/${id}`);
            const data = await res.json();
            setname(data.username);
          };
          loadUser();
    const checkFriend = async () => {
      const value = await isFriend(id);
      setIsFriendState(value);
    } 
    checkFriend();
    }, [id]);

    

    const Addfriend = async () =>{
      const token = localStorage.getItem("token"); // login ke baad token save kar lena
      const res = await fetch("/api/addfriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tok: token,friend_id: id ,friend_username: user_name})
    });

    const data = await res.json();
    if (data.error){
              toast.error("Your session is end please try again");
    }
    else if(data.already_fri){
              toast.info("this is you already friend");
    }
    else if(data.Added){
          toast.success("This is successfullay added as your friend")
          setIsFriendState(true);
    }
    else{
      toast.error("Somting went wrong")
    }

  }

  return (
    <div className="p-4 text-white bg-base-100 justify-items-center">
    <div className="h-[50%] w-[20%] bg-gray-900 p-4 rounded-xl flex flex-col items-center gap-3">

      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
      />

      <h1 className="text-2xl font-bold">User Profile</h1>

      <p>User ID: {id}</p>

      <div>Username: {user_name}</div>
      {isFriendState ? (
      <button className="btn btn-primary bg-blue-400 border-amber-300 border-2">
        Friend+
      </button>
    ) : (
      <button onClick={Addfriend} className="btn btn-primary">
        Add Friend
      </button>
    )}
    </div>

    
  </div>
  );
}
