// import Footer from "@/components/foter";
import Navbar from "@/components/navbar";
import { useEffect,useState,useRef } from "react";
import { useParams } from "react-router-dom";
import Nav_chat from "./nav_chat";
import Fetchmessage from "./api_utlits/message_fetch";
import { toast } from "react-toastify";
import SendMessage_api from "./api_utlits/sent_message";
// import WebSocket_api from "./api_utlits/webstock_api";
import WebSocket_url from "./api_utlits/websocket_url";
// import useWebSocket from "react-use-websocket";
import { useWS } from "@/websocketprovider/websocket";
import { ChatScreen } from "./chatScreen_comp/chat_screen";
import Chat_input_btn from "./chatScreen_comp/chat_input";
import Create_url from "./api_utlits/filr_sent_api";
import Play_load1 from "./playload/play_load1";
import Play_load2 from "./playload/play_load2";


// import { Query } from "@tanstack/react-query";

export default function Chat(){
    // const [username,setname] = useState("");
    const [file, setFile] = useState(null);
    const [all_message,set_allMessage] = useState([]);
    const [message, setMessage] = useState("");
    const [last_mess,setLast] = useState("");
    const {id} =useParams();
    const token = localStorage.getItem("token");
    const [current_id,set_id] = useState("");

  const bottomRefE = useRef(null);

    useEffect(() => {
      if (!bottomRefE.current) return;

      // thoda delay taaki DOM render ho jaye
      setTimeout(() => {
        bottomRefE.current.scrollIntoView({ behavior: "auto" });
      }, 0);

    }, [all_message]);


    useEffect(()=>{
      const load = async () =>{
          
            const message_get = await Fetchmessage(token,id);
            
            if (message_get.error){
              toast("Somting went wrong","error");
              return;
            }
            const messages = message_get.message;
            // console.log(messages)
            if (messages.length === 0){
              toast("You have no message with this friend");
            }
            const myId = message_get.current_id;
            set_id(myId);
            const sortedMessages = [...messages].sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );

            
            set_allMessage(sortedMessages);


    };
    load();
    }
  
  ,[id]);
    // const ws_url = WebSocket_url();
    // const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(ws_url, {
    //     queryParams: { tok: token },
    //     share: true,
    //   });
      const {
        sendJsonMessage,
        lastJsonMessage,
        readyState,
      } = useWS();
    useEffect(()=>{
           if (!last_mess) return;
          const ls = last_mess;
          setLast("");
          
          sendJsonMessage({
          to: id,
          message: ls,
        });

    },[last_mess]);

    
    useEffect(() => {
         if (!lastJsonMessage) return;

        console.log("WS Message:", lastJsonMessage);
        // const messageo = lastJsonMessage.msg;
        // Agar message mujhe receive hua hai:
        const msg = {
          sender_id: lastJsonMessage.from,
          receiver_id: id,
          message: lastJsonMessage.msg,
          created_at: "Now"

        }
        console.log(msg.created_at);
        console.log(msg);
        console.log(lastJsonMessage);
        if (String(lastJsonMessage.from) === String(id)) {
          set_allMessage(prev => [...prev, msg]);
        }

      }, [lastJsonMessage]);
  
    const sent_mess = async (e) => {
      e.preventDefault(); // page reload rokne ke liye
      let type = null;
      let sent_msg = null;
      if (!message && !file){
        toast("Write Somting to sent");
        return;
      } 
      if(message && file){
        toast.error("This is beta version there for we can not have both file and message sent routes at a time  only oen can go");
        return ;
      }
      if(file && !message){
        const data = await Create_url(file);
        if (data.error){
          toast.error(data.error);
          return;
        }
        else if(data.url){
          // message = data.url;
          type = data.type;
          sent_msg = Play_load2(current_id,id,data.url,type)
        }
      }
      if (message && !file){
        type = "text"
        sent_msg = Play_load1(current_id,id,message)
      }

      if(sent_msg == null){
        return;
      }
      console.log(sent_msg);
      set_allMessage([... all_message, sent_msg]);
      setLast(message);
      setMessage("");
      const data = await SendMessage_api(token,id,message,type);
      // yaha fetch ya websocket se message bhejo
      console.log()
      
      if(data.Success){
        console.log("Success Fully go to the targert this message");
        console.log("Send message:", message);
        // input clear karne ke liye
      }
      else{
        toast("Somting went wronge",Error);
      } 
    };

    const rev_msg = (id_o) =>{
       if (id_o == id){
        return false;
       }
       else{
        return true;
       }
    };

    return (
  <>
  <div className="fixed top-0 left-0 w-full h-screen flex flex-col bg-base-300">
    <Navbar />
    
    <div className="">
      
      {/* Chat container */}
      <div className="flex flex-col   w-full items-center flex-grow">
        
        <div className="w-1/2 text-white">

          <Nav_chat id={id} />

          {/* Messages */}
          <div className="h-screen flex flex-col">
          <div className="w-full flex-1 overflow-y-auto px-4 py-4 ">

          <div className="w-full mt-10  mb-100 flex-grow">
            <div className="w-full">
              <div className="w-full overflow-y-auto" >
                  {all_message.map((msg, index) => (
                                   
                    <ChatScreen key={index}  msg={msg.message} sent={rev_msg(msg.sender_id)} ct_at={msg.created_at}/>
                     
                 
                  ))}
                   <div ref={bottomRefE} />
              </div>
            </div>
          </div>
          </div>
          </div>
          {/* Form – fixed at bottom inside page */}
          <div className="mt-auto w-1/2  text-base-100 flex flex-col rounded-2xl fixed bottom-10">
            
            <Chat_input_btn
                  message={message}
                  setMessage={setMessage}
                  onSend={sent_mess}
                  file={file}
                  setFile={setFile}
                />
          </div>

        </div>

      </div>
    </div>
    </div>
  </>
);
}