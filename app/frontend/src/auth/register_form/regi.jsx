import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  Check,
  X,
  Sparkles,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { checkUsername } from "../api_utlits/username_check";
import Name from "../extra/Name";
import DOB from "../extra/dob";
import CountrySelect from "../extra/country_select";
import User_Name from "../extra/user_name";
import Email from "../extra/email";
import PasswordInput from "../extra/password";
import Bio from "../extra/bio";

import { toast } from "react-toastify";
import { regiUser } from "../api_utlits/regi_api";
import { useNavigate } from "react-router-dom";


export default function RegisterScreen() {

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /* STEP 1 */
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState();
  const [country, setCountry] = useState("");

  /* STEP 2 */
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  /* STEP 3 */
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /* STEP 2 */
  const [bio, setBio] = useState("");

  /* Username check (fake) */
  
useEffect(() => {
  if (username.length < 3) {
    setUsernameAvailable(null);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setCheckingUsername(true);

      const data = await checkUsername(username);

      // agar exist karta hai
      if (data.exists) {
        setUsernameAvailable(false);
      } else {
        setUsernameAvailable(true);
      }

    } catch (err) {
      console.error(err);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }, 500); // debounce 500ms

  return () => clearTimeout(timer);
}, [username]);

  /* Password strength */
  const passwordStrength = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;

    if (s <= 1) return { w: "25%", c: "#FF6B6B", l: "Weak" };
    if (s === 2) return { w: "50%", c: "#FFB347", l: "Fair" };
    if (s === 3) return { w: "75%", c: "#FFD93D", l: "Good" };
    return { w: "100%", c: "#6BCB77", l: "Strong" };
  })();

  const step1Ok = fullName.length >= 2 && dob && country.length >= 2;
  const step2Ok = username.length >= 3 && usernameAvailable;
  const step3Ok =
    emailVerified && password === confirmPassword && password.length >= 8;

  

  const handleSubmit = async (e) =>{
        e.preventDefault();
  
        try{
          if (!emailVerified){
              toast.error("Plese Verify Email firstly");
              return;
          }
  
          const data = await regiUser(fullName,dob,email,bio,country,username,password,emailVerified);
          
          if (data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", username)
            navigate("/home")
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

  return (
    <div className="min-h-screen flex items-center bg-base-100 justify-center px-4 text-base-content" >
      <div className="w-full max-w-md bg-base-300 rounded-3xl p-8 shadow-x ">
        {/* Progress */}
        <div className="flex gap-2 mb-6 m-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded ${
                step >= s ? "bg-pink-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
                <Name value={fullName} onChange={setFullName} />
              <Popover>
                <PopoverTrigger asChild>
                  <DOB value={dob} onChange={setDob} />
                </PopoverTrigger>
              </Popover>

              
            <CountrySelect value={country} onChange={setCountry}/>
              <button
                disabled={!step1Ok}
                onClick={() => setStep(2)}
                className="btn m-2 btn-primary bg-primary"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                
                <User_Name value={username} onChange={setUsername} />
                {username.length >= 3 && (
                  <span className="absolute right-3 top-3">
                    {usernameAvailable ? (
                      <Check color="green" />
                    ) : (
                      <X color="red" />
                    )}
                  </span>
                )}
              </div>
                <div>
                  <Bio value={bio} onChange={setBio} />

                </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn gray m-2">
                  Back
                </button>
                <button
                  disabled={!step2Ok}
                  onClick={() => setStep(3)}
                  className="btn bg-primary m-2"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex gap-2 ">
                
                <Email value={email} onChange={setEmail} onVerified={setEmailVerified}/>
              </div>

            
              <div className="relative bg-base-100 m-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10 m-2"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <div className="h-2 bg-gray-200 rounded m-2">
                <div
                  className="h-full rounded "
                  style={{
                    width: passwordStrength.w,
                    background: passwordStrength.c,
                  }}
                />
              </div>

              <div className="relative bg-base-100 m-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="input pr-10 m-2"
                />
                <button
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="eye"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn bg-secondary gray m-2">
                  Back
                </button>
                <button
                  disabled={!step3Ok || !emailVerified}
                  onClick={handleSubmit}
                  className="btn btn-primary bg-primary m-2"
                >
                  {isLoading ? "Creating..." : <>Create <Sparkles /></>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
