import { motion } from "motion/react";

import {
  ChevronLeft,
  Phone,
  Video,
  EllipsisVertical,
  
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage  } from "@/components/ui/avtar";

export default function Nav_chat_fun({Name}){
    const Fir=Name[0];
    const Status = "Online";
    return(
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-r from-[#833AB4]/5 via-[#FD1D1D]/5 to-[#FCB045]/5 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-4"
      >
        <button
          className="p-2 -ml-2 hover:bg-muted rounded-full active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 flex-1">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#FCB045]/20 text-[#833AB4]">
              {Fir}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">{Name}</h3>
            <p className="text-xs text-muted-foreground">{Status}</p>
          </div>
        </div>

        <div className="flex gap-1">
          <Video className="w-5 h-5 text-muted-foreground mr-2" />
          <Phone className="w-5 h-5 text-muted-foreground mr-2" />
          <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
        </div>
      </motion.div>
      </div>
    );
}