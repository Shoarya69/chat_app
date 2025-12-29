// import "./auth.css";
// import Regi_css from "./registercss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { regiUser } from "./api_utlits/regi_api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";


import Bio from "./extra/bio";  //
import CountrySelect from "./extra/country_select"; //
import DOB from "./extra/dob";  //
import Email from "./extra/email"; //
import Name from "./extra/Name"; //
import PasswordInput from "./extra/password"; //
import User_Name from "./extra/user_name"; //

export default function Register_2_page(){
    const nagivate = useNavigate();
    const[Full_Name,setFullname]= useState("");
    const[Email_reg,setEmail]=useState("");
    // const[Mobile_No,SetNumber]=useState("");
    const[Contry,setContry]=useState("");
    const[Bio_reg,SetBio]=useState("");
    const[DOB_reg,setDOB]=useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const registerSubmit = async (e) =>{
      e.preventDefault();

      try{
        if (!otpVerified){
            toast.error("Plese Verify Email firstly");
            return;
        }

        const data = await regiUser(Full_Name,DOB_reg,Email_reg,Bio_reg,Contry,username,password,otpVerified);
        
        if (data.token){
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", username)
          nagivate("/home")
          toast.success("Register Successful");
        }
        else if(data.dup){
          toast.info("this username already exist");
        }
        else if(data.error){
          console.log(data.error);
          toast.info("This is server side error. Plz try again sometime later")
        }
        else if(data.mis){
          toast.error(data.mis);
        }
        else{
          toast.error("Somting went Wrong, please try again");
        }
      }catch(err){
        console.error(err);
        toast("Server side error");
      }
    }
    
    return(
        <div className="">
             <div className="bg-base-300 w-full h-screen flex items-center justify-center ">
                <div className="w-[50%] bg-black p-20 border-4 border-amber-300 rounded-2xl">
                  <p className="mb-10 text-center text-red-700 font-extrabold text-4xl">Registeration Form</p>
                  <form onSubmit={registerSubmit} className="">
                    <Name 
                        value={Full_Name}
                        onChange={setFullname}
                    />
                    <DOB
                        value={DOB_reg}
                        onChange={setDOB}
                    />
                    <CountrySelect
                        value={Contry}
                        onChange={setContry}
                    />
                    <Bio
                        value={Bio_reg}
                        onChange={SetBio}
                    />
                    <Email
                        value={Email_reg}
                        onChange={setEmail}
                        onVerified={setOtpVerified}
                    />
                    
                    <User_Name
                        value={username}
                        onChange={setUsername}
                    />
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                    />
                    <button type="submit" className="btn btn-primary p-4 text-2xl mb-5 " disabled={!otpVerified}>Register</button>
                  </form>
        
                  <p className="text-primary-content">
                     i have an account alredy?{" "}
                    <Link className="link-accent text-2xl" to="/login" >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
    );
}