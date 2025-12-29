import React from "react";
import OtpInput from "react-otp-input";

export default function Otp_box({ value, onChange }) {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      shouldAutoFocus   // 🔥 THIS IS CRITICAL
      inputType="tel"   // 🔥 numeric keyboard + better focus
      renderSeparator={<span className="mx-1 mb-10">-</span>}
      renderInput={(props) => (
        <input
          {...props}
          className="border-2 border-primary-content rounded-md
                      text-5xl text-center mx-1 w-16 h-10 mb-10 p-2
                     text-base-content bg-base-200"
        />
      )}
    />
  );
}
