import { motion } from "motion/react";
import { User, MessageCircle, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avtar"; 
import Navbar from "@/components/navbar";
import getProfile from "./api_utlis/profile_api";
import { useQuery } from "@tanstack/react-query";
import { useEffect,useState } from "react";
import Dummay_data from "@/profile_edit/api_utlis/dummydata";
import { toast } from "react-toastify";


export function ProfileScreen() {
  // const [user_id,setid] = useState("");
  const [user_name,setusername] = useState("");
  const [dob,setdob] = useState("");
  const [bio,setbio] = useState("");
  const [contry,setcontry] = useState("");
  const [Name,setName] = useState("");
  const [email,setEmail] = useState("");

  const tok = localStorage.getItem("token");
  const {data,isLoading,error}= useQuery({
    queryKey: ['Profile',tok],
    queryFn: () => getProfile(tok),
    enabled: !!tok, 
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  })
  
 
  useEffect(() => {
    if (!data) return;
   const res = data;
   console.log(res);
    if (res.use_dummy){
      // setid(Dummay_data.Id);
      setusername(Dummay_data.username);
      setName(Dummay_data.Name);
      setdob(Dummay_data.dob);
      setEmail(Dummay_data.email);
      setbio(Dummay_data.Bio);
      setcontry(Dummay_data.Country);
      console.log(res);
      return;
  
    }
    // setid(res.id);
    setusername(res.Username);
    setName(res.Name);
    const onlyDate = res.dob.split("T")[0];
    setdob(onlyDate);
    setEmail(res.Email);
    setbio(res.Bio);
    setcontry(res.Country);
    console.log(res);
 
}, [data]);
  
   if (isLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      Loading profile...
    </div>
  );
}

if (error) {
  return (
    <div className="h-screen flex items-center justify-center text-red-500">
      Something went wrong
    </div>
  );
}

 
  return (
    <div className="h-screen w-screen flex flex-col bg-base-100 text-base-content items-center  pb-20 overflow-y-auto">
      <Navbar/>
      {/* Header */}
      <div className="w-[50%] ">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="bg-gradient-to-r from-[#833AB4]/5 via-[#FD1D1D]/5 to-[#FCB045]/5 backdrop-blur-sm border-b border-border px-6 py-4"
      >
        <h1 className="text-2xl">Profile</h1>
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="px-6 py-8 flex flex-col items-center"
      >
        <div className="relative mb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white text-3xl">
              {Name?.slice(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-[#833AB4] to-[#FD1D1D] rounded-full border-4 border-card flex items-center justify-center hover:opacity-90 transition-all duration-150 active:scale-95">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <h2 className="text-xl mb-1">{user_name || ""}</h2>
        <p className="text-muted-foreground text-sm mb-4">{Name || ""}</p>
        
        <div className="px-6 py-3 bg-black text-base-content font-extrabold rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground text-center">
            {bio || ""}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="mx-6 mb-6 grid grid-cols-2 gap-4"
      >
        <div className="bg-card border border-border rounded-2xl p-4 text-center  ">
          <MessageCircle className="w-6 h-6 mx-auto mb-2 text-[#833AB4]" />
          <p className="text-2xl font-medium mb-1 text-primary">127</p>
          <p className="text-xs text-muted-foreground">Conversations</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 text-center">
          <Phone className="w-6 h-6 mx-auto mb-2 text-[#FD1D1D]" />
          <p className="text-2xl font-medium mb-1 text-primary">42</p>
          <p className="text-xs text-muted-foreground">Total Calls</p>
        </div>
      </motion.div>

      {/* Account Info */}
      <div className="px-6 pb-6 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm text-primary">{email || ""}</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
              <p className="text-sm text-primary">December 2024</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.2 }}
        className="px-6 pb-8 text-center"
      >
        <p className="text-xs text-muted-foreground">
          My_chat_app(fredom)
        </p>
      </motion.div>
      </div>
    </div>
  );
}