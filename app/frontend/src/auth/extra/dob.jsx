function DOB({ value, onChange }) {
  return (
    <div className="input text-left m-2">
      <input
        type="date"
        name="dob"
        value={value}
        onChange={e => onChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        required
        className="float-right m-2"
      />
      
    </div>
  );
}

export default DOB;
