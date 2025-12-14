import Searchcss from "./searchcss";
import { useState } from "react";
import { searchUser } from "./api_utli/api_search";
import { toast } from "react-toastify";
import UserList from "./userlist";

export default function Navbar() {
    const [username,setusername] = useState("");
     const [results, setResults] = useState([]);
    const Seach_user = async (e) =>{
        e.preventDefault();
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
    <div className={Searchcss.main_div}>
        <div className={Searchcss.nav}>
        

        {/* CENTER BIG SEARCH BAR */}
        <form onSubmit={Seach_user} className={Searchcss.form}>
            <div className={Searchcss.search_abc}>
                <label className={Searchcss.search}>
                <input type="text" className={Searchcss.search_input} placeholder="Search..." 
                    value = {username}
                    onChange ={(e) => setusername(e.target.value)}
                />
                </label>
            </div>

            {/* RIGHT SIDE (OPTIONAL) */}
            <div className={Searchcss.div}>
                <button className={Searchcss.Search_btn}>Search</button>
            </div>
        </form>
        </div>
        <UserList data={results}/>
    </div>
  );
}
