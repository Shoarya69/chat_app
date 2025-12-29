import { Search } from "lucide-react";

export default function Search_input_btn({
  value,
  setValue,
  onSend,
}) {
  return (
    <form
      onSubmit={onSend}
      className="border-t px-4 py-3 flex gap-3 w-full"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="flex-1 bg-muted rounded-full px-5 py-3 outline-none"
      />

      {value.trim() && (
        <button
          type="submit"
          className="p-3 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      )}
    </form>
  );
}
