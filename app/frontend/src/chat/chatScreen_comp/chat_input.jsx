import { Send } from "lucide-react";

export default function Chat_input_btn({
  message,
  setMessage,
  onSend,
}) {
  return (
    <form
      onSubmit={onSend}
      className="border-t px-4 py-3 flex gap-3 w-full"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="flex-1 bg-muted rounded-full px-5 py-3 outline-none"
      />

      {message.trim() && (
        <button
          type="submit"
          className="p-3 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      )}
    </form>
  );
}
