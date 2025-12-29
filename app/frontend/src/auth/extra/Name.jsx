function Name({ value, onChange, maxLength = 50 }) {
  return (
    <div className="bg-base-300">
      <input
        type="text"
        name="Full Name"
        placeholder="Enter Your Full Name"
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        required
        className="input m-2 text-base-content"
      />
      
    </div>
  );
}

export default Name;
