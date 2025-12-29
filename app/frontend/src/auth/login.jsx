import { useState } from "react";
import { loginUser } from "./api_utlits/login_api.js";
import logincss from './logincss.js';
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

function Login_page(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e) =>{
     e.preventDefault();
    try {
         const data = await loginUser(username,password);
    // console.log(data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", username);
          navigate("/home");
          toast.success("Login Successful");

        } else {
          toast.error(data.error || "Login Failed");
        }
        
        }catch(err){
          console.err(err);
          toast.error("Server side error");
        }
   
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
    return (
    <div className={logincss.body}>
      <div className={logincss.card}>
        <div className="card-body">
          <h2 className={logincss.title}>Login</h2>

          <form className="flex flex-col space-y-3" onSubmit={handleLoginSubmit}>
            <div className={logincss.input}>
              <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            </div>
            <div className={logincss.input}>
              <input
               type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
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
            <button className={logincss.button}>Login</button>
          </form>

          <p className={logincss.footer}>
            Don’t have an account?{" "}
            <Link to="/register" className={logincss.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    
    </div>
    );
}

export default Login_page;