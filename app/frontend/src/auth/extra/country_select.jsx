import Select from "react-select";
import countries from "../info/countries.json";

const options = countries.map(c => ({
  value: c.name,
  label: (
    <div style={{ display: "flex", alignItems: "center" }} 
      
    >
      <img src={c.flag} alt="" style={{ width: 20, marginRight: 8 }} />
      <span>{c.name}</span>
    </div>
  )
}));

function CountrySelect({ value, onChange }) {
  return (
    <div className="text-black m-2  rounded-2xl">
    <Select
      options={options}
      value={options.find(o => o.value === value)}
      onChange={o => onChange(o.value)}
      
    />
    </div>
  );
}

export default CountrySelect;
