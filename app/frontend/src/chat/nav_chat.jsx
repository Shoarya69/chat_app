import { useState,useEffect } from "react";
import Fetchdata from "./api_utlits/user_data";
export default function Nav_chat({id}){
    const [user_name,setname] = useState("");
    
    useEffect(() =>{
        const load = async () =>{
            const data = await Fetchdata(id);
            if (data.username){
                setname(data.username);
            }
        }
        load();
    },[id])
    return(
        <div className="w-full flex bg-base-300 items-center">
            <div className="m-[0.5%] w-15 h-15 border-3 rounded-full">
                <img src="#" alt="Picture" />
            </div>
            <div className="m-[0.5%] font-extrabold text-amber-100 text-2xl">{user_name}</div>
        </div>
    );
}