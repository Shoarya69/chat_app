// import main_css from "./css/mainconcss.js";
// import Inputbox from "./maincontent/Input_box.jsx";
// import Left_side from "./maincontent/Left_sider.jsx";
// import Message from "./maincontent/messages.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import message from "./maincontent/messages";
import fetchFriend from "./maincontent/api_utli/fecteh_api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ChatItem from "./ui_op/frinend_list_ui";


function Main_contect() {
  // const [user_name,setname] = useState("");
  const [friends,setfriend] = useState([]);
  const token = localStorage.getItem("token");
  const { data, isLoading, error } = useQuery({
    queryKey: ["friends",token],
    queryFn: () => fetchFriend(token),
    staleTime: Infinity, // 5 min cache
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    
  });
  // console.log(friends);

  useEffect(()=>{
    if (!data || !data.friends) return;
    if (data.No_friends){
      toast.info("You have lonely persion");
      return;
    }
    if(data){

      const { username, user_id } = data.friends;
      const mappedFriends = username.map((name, idx) => ({
                type: "friend_list",
                f_id: user_id[idx],
                f_name: name
            }));
      setfriend(mappedFriends);
    };
  },[data])

  useEffect(() => {
  if (isLoading) toast.info("Friends are loading");
  if (error) toast.error("Frontend error");
}, [isLoading, error]);
  return (
    <div className="bg-base-100 justify-items-center-safe w-full h-full">
      <h2 className="text-4xl pt-10 font-extrabold text-white ">Friend List</h2>
      <ul className="flex flex-col items-center w-full">
        {friends.map((f, i) => (
          <Link to={`chat/${f.f_id}`} className="w-[50%]"  key={i}>
             <ChatItem name={f.f_name} index={i} /> {/* +1 kyu ki index 0 se start hota hai */}
          </Link>
        ))}
      </ul>

    </div>
  );
}

export default Main_contect;
