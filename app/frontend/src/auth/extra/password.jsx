import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


function PasswordInput({ value, onChange, maxLength = 50 }) {
  const [show, setShow] = useState(false);

  const toggle = () => {
      setShow(prev => !prev);
    }
  return (
    <div style={{ position: "relative" }} 
      className="text-base-content border-2 mb-5 bg-base-300 text-xl rounded-xl"
    >
      <input
        type={show ? "text" : "password"}
        name="password"
        value={value}
        placeholder="Password"
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        required
        className="w-full p-2"
      />

      <span
        onClick={toggle}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        {show ? (
          <AiOutlineEye color="green" />
        ) : (
          <AiOutlineEyeInvisible color="gray" />
        )}
      </span>
    </div>
  );
}

export default PasswordInput;