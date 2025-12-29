import { motion } from "framer-motion";
// import { Avatar, AvatarImage, AvatarFallback } from "./avatar"; // adjust path
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avtar";
// Reusable ChatItem function
function ChatItem({ name, index}) {
  // Constants for now
  const avatar = ""; // blank or placeholder image
  const lastMessage = "No messages yet";
  const online = true;
  const unread =  Math.floor(Math.random() * 3);
  const time = "10:30 AM";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
    //   onClick={onClick}
      className="bg-black text-amber-50 mt-2 flex items-center gap-4 px-6 py-4 hover:bg-muted/30 cursor-pointer transition-all duration-150 border-b border-border/50 active:bg-muted/50 rounded-2xl"
    >
      {/* Avatar */}
      <div className="relative">
        <Avatar className="w-14 h-14">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#FCB045]/20 text-[#833AB4]">
            {name}
          </AvatarFallback>
        </Avatar>
        {online && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00ff00] rounded-full border-2 border-card" />
        )}
      </div>

      {/* Name + last message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium truncate text-[15px]">{name}</h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>

      {/* Unread */}
      {unread > 0 && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#833AB4] to-[#FD1D1D] flex items-center justify-center">
            <span className="text-xs text-white">{unread}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ChatItem;

