import { useEffect, useState } from "react";
import fetchNotifications from "./api_utlisis/notfi_api";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { NotificationTab } from "./ui/notfication_ui";
import Navbar from "@/components/navbar";
// import avatar from "daisyui/components/avatar";
export default function Notfi() {
    const [messages, setMessages] = useState([]);
    // const [user_id, setuser] = useState("");
    const [Accept,setAccept] = useState();
    const token = localStorage.getItem("token");
    const { data, isLoading, error } = useQuery({
        queryKey: ["friendRequest",token],
        queryFn: () => fetchNotifications(token),
        staleTime: Infinity, // 5 min cache
        cacheTime: Infinity,
        refetchOnWindowFocus: true,
        
    });

    useEffect(() => {
            if (data && data.Notfi) {
                const formatted = data.Notfi.map(req => ({
                    id: req.id,
                    username: req.username,
                    avatar: "",
                    mutualfriends: 3,
                    timestamp: "Monday"
                }));

                setMessages(formatted);
            }
            if (data && data.No_Notfi){
                toast.info("No Notification Yet");
                return;
            }
            if (data && data.error){
                toast.info("Somting went Wrong");
                return;
            }
        }, [data]);
    useEffect(()=>{
        if(error){
            console.log(error);
             toast.error("Somting went wrong on Frontend");
        }
    },[error])
    return (
        <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1 bg-base-100 text-base-content">
            <NotificationTab friendRequests={messages} setFriendRequests={setMessages} accpet={Accept} setAccept={setAccept} />
            
        </div>
    </div>
    );
}
