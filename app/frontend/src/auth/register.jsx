import "./auth.css";
import Regi_css from "./registercss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { regiUser } from "./api_utlits/regi_api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Register_page(){
    const nagivate = useNavigate();
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const registerSubmit = async (e) =>{
      e.preventDefault();

      const data = await regiUser(username,password);

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
        toast.info("This is server side error. Plz try again sometime later")
      }
      else if(data.mis){
        toast.error(data.mis);
      }
      else{
        toast.error("Somting went Wrong, please try again");
      }
    }
    const togglePassword = () => {
      setShowPassword(!showPassword);
    }
    return(
        <div className={Regi_css.body}>
              <div className={Regi_css.card}>
                <div className="card-body">
                  <h2 className={Regi_css.title}>Register</h2>
        
                  <form className="flex flex-col space-y-3" onSubmit={registerSubmit}>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      className={Regi_css.input}
                      onChange={e => setUsername(e.target.value)}
                    />
                    <div className={Regi_css.input}>
                      <input
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password"
                      value = {password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <span
                      onClick={togglePassword}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer"
                      }}
                    >
                      {showPassword ? (
                        <AiOutlineEye color="green" />
                      ) : (
                        <AiOutlineEyeInvisible color="gray" />
                      )}
                    </span>
                    </div>
                    <button className={Regi_css.button}>Register</button>
                  </form>
        
                  <p className={Regi_css.footer}>
                     i have an account alredy?{" "}
                    <Link to="/login" className={Regi_css.link}>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
    );
}