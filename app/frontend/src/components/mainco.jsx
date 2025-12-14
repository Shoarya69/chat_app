// import main_css from "./css/mainconcss.js";
// import Inputbox from "./maincontent/Input_box.jsx";
// import Left_side from "./maincontent/Left_sider.jsx";
// import Message from "./maincontent/messages.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import message from "./maincontent/messages";
import fetchFriend from "./maincontent/api_utli/fecteh_api";
function Main_contect() {
  // const [user_name,setname] = useState("");
  const [friends,setfriend] = useState([]);

  useEffect(() =>{
      const load = async () => {
        const token = localStorage.getItem("token");
        const friendData = await fetchFriend(token);
        if (friendData && friendData.friends){
          const { username, user_id } = friendData.friends;
          const mappedFriends = username.map((name, idx) => ({
                type: "friend_list",
                f_id: user_id[idx],
                f_name: name
            }));


          setfriend(mappedFriends);
          

        }
      }
      load ();
    }  
  ,[]);
  return (
    <div className="bg-base-100 justify-items-center-safe w-full h-full">
      <h2 className="text-4xl pt-10 font-extrabold text-white ">Friend List</h2>
      <ul className="flex flex-col items-center w-full">
        {friends.map((f, i) => (
          <Link to={`chat/${f.f_id}`} className="w-[50%] rounded-2xl block border-4 items-center mt-[2.3%] p-[1.2%] hover:border-8 text-violet-300 drop-shadow-[0_0_8px_rgba(0,225,0,0.5)] hover:border-red-800 hover:text-3xl hover:text-green-500" key={i}>
            {i + 1}. {f.f_name} {/* +1 kyu ki index 0 se start hota hai */}
          </Link>
        ))}
      </ul>

    </div>
  );
}

export default Main_contect;
