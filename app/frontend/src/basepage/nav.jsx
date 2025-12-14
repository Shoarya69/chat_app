import basecss from "./basecss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
export default function Nav_bar(){
    const [log, setLog] = useState(!!localStorage.getItem("token")); 
    useEffect(() => {
    setLog(!!localStorage.getItem("token"));
  }, []);

    const logout = () => {
    toast.info("You are successfully logged out of your account");
    localStorage.removeItem("token");
    setLog(false); // 🔹 frontend turant update
  };

    return (
        <>
            <ul className={basecss.navbar}>
                <div className={basecss.nav_div}>
                    {log ?  <li className={basecss.cont_btn}><Link to='/home'>Main</Link></li>:<></>}
                    <li className={basecss.cont_btn}> <Link to="/">Contatc Us</Link></li>
                    {log ? <li className={basecss.loginout_btn}><Link  onClick={logout}>LoginOUT</Link></li>:<li className={basecss.login_btn}><Link to="/login">Login</Link></li>}
                </div>
            </ul>
        </>
    );
}
