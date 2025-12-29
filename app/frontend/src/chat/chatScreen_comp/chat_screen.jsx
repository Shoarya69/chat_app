import { motion } from "motion/react";
import {
  CheckCheck,
} from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage  } from "@/components/ui/avtar";
// import { useState } from "react";

export function ChatScreen({ msg,sent,ct_at="0:00 PM" }) {

  let time;

  if (ct_at === "Now") {
    time = "Now";
  } else {
    time = new Date(ct_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }


  const check = false;
  const index = 1; 
  const read = true;
  return (
    <div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-3">
        
          <motion.div
            
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex ${sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl  px-4 py-3 ${
                sent
                  ? "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white rounded-br-md"
                  : "bg-card  rounded-bl-md bg-gradient-to-br from-[#2e1e38] via-[#860808] to-[#8a5915] text-base-content"
              }`}
            >
              <p className="text-l">{msg}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="text-xs opacity-70">{time}</span>
                {check && (
                  <CheckCheck
                    className={`w-4 h-4 ${
                      read ? "opacity-100" : "opacity-50"
                    }`}
                  />
                )}
              </div>
            </div>
          </motion.div>
     
      </div>

     
    </div>
  );
}
