import { useState } from "react";
import Email_val_api from "../api_utlits/email_valadation_api";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Otp_box from "./otp_box/otp_box";
import Email_val_api_verifyOtp from "../api_utlits/email_verify_otp";
// import button from "daisyui/components/button";

function Email({ value, onChange,onVerified, maxLength = 50 }) {
    const[otpSent,setOtpSent]=useState(false);
    const [otp, setOtp] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [verified, setVerified] = useState(false);
    const [btnDisabled,setBtnDisabled] = useState(false);
    const [btnText, setBtnText] = useState("Send OTP");

    const sendOtp = async () =>{
      
      if (otpSent) {
          toast.info("OTP already sent. Please check your email.");
          setBtnText("Processing..");
          return; // 🔥 STOP here
        }

        try{
                setBtnDisabled(true);
                setBtnText("Processing..");
                

                const data = await Email_val_api(value);
                console.log(data);
                if (data.success) {
                     setOtpSent(true);
                    setShowPopup(true); // show popup to enter OTP
                    
              }else if(data.error){
                  toast.error(data.error);
                  setBtnText("Send Otp");
                  setBtnDisabled(false);
              }  
              else {
                toast.error("Failed to send OTP");
                setBtnText("Send Otp");

                  setBtnDisabled(false);

              }
                }catch(errr){
                    console.log(errr);
                    toast.error("Somting went wrong on Server side for Email");
                    setBtnText("Send Otp");
;
                   setBtnDisabled(false); 
                }
                
    }
    const verifyOtp = async () => {
                console.log(otp)
                const res = await Email_val_api_verifyOtp(value, otp);
                if (res.verified) {
                  toast.success("Otp has been verified");
                  setShowPopup(false);
                  setVerified(true);         // mark verified
                  onVerified(true);          // notify parent
                }
                else if(res.error){
                  toast.error(res.error);
                } 
                else {
                alert("Invalid OTP");
                }
            };
  return (
    <div className="mb-5 text-base-content text-2xl flex">
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        required
        className="input m-2"

      />
      {!otpSent && !verified && (
        <button type="button" id="otp_button" disabled={btnDisabled || otpSent} className="btn small m-2" onClick={sendOtp}>
          {btnText}
        </button>
      )}

      {/* Green tick if verified */}
      {verified && (
        <AiOutlineCheckCircle
          color="green"
          size={24}
          style={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}     
      {/* OTP popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
            className="bg-base-300 text-base-content"
          >
            <h2 className="mb-10">Enter OTP</h2>
            {/* <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="border-2 border-primary-content rounded-xl text-center mr-10 text-2xl"
            /> */}
            <Otp_box value={otp} onChange={setOtp} />
            <button type="button" className="btn btn-primary" onClick={verifyOtp}>
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Email;
