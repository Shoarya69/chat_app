function Bio({ value, onChange, maxLength = 160 }) {
  return (
    <div className="">
      <input
        name="bio"
        type="text"
        placeholder="Tell us something about yourself..."
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        required
        className="input m-2"
      />
      <small className="ml-3 text-base-content w-[1%]">{value.length}/{maxLength}</small>
    </div>
  );
}

export default Bio;
