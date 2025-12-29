function User_Name({ value, onChange, maxLength = 50 }) {
  return (
    <div 
    >
      <input
        type="text"
        name="UserName"
        value={value}
        placeholder="Enter Your Username"
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        required
        className="input pr-10 m-2"
      />
      
    </div>
  );
}

export default User_Name;
