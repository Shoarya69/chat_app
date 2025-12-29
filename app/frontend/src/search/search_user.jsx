import Searchcss from "./searchcss";
import { useState } from "react";
import { searchUser } from "./api_utli/api_search";
import { toast } from "react-toastify";
import UserList from "./userlist";
import { default as Navbar_main } from "@/components/navbar";

import Search_input_btn from "./ui/search_bar";

export default function Navbar() {
    const [username,setusername] = useState("");
     const [results, setResults] = useState([]);

    const Seach_user = async (e) =>{
        e.preventDefault();
        setusername("");
        setResults([]);
        const data = await searchUser(username);
        if(data.No_one){
            toast.info("There is no one with your suggested name")
        }
        else if (data){
            toast.success("There is Some reuslt Present");
            setResults(data);
        }
        
        else{
            toast.info("No result is found");
        }

    }
    return (
        <>
    <Navbar_main/>
    <div className={Searchcss.main_div}>
        <div className={Searchcss.nav}>
        

        {/* CENTER BIG SEARCH BAR */}
        {/* <form onSubmit={Seach_user} className={Searchcss.form}>
            <div className={Searchcss.search_abc}>
                <label className={Searchcss.search}>
                <input type="text" className={Searchcss.search_input} placeholder="Search..." 
                    value = {username}
                    onChange ={(e) => setusername(e.target.value)}
                />
                </label>
            </div>

            
            <div className={Searchcss.div}>
                <button className={Searchcss.Search_btn}>Search</button>
            </div>
        </form> */}
        <div className="w-[50%]">
            <Search_input_btn  value={username} setValue={setusername} onSend={Seach_user} />        
        </div>
        </div>
        <UserList data={results}/>
    </div>
    </>
  );
}
