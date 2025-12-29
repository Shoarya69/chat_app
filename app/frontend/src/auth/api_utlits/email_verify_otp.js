export default async function Email_val_api_verifyOtp(email,Otp){
    const OTP = String(Otp)
    const res = await fetch("/api/verify_otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email : email, otp : OTP })
  });

  const data = await res.json();
  return data;
}