import { Send,Paperclip } from "lucide-react";

export default function Chat_input_btn({
  message,
  setMessage,
  onSend,
  file,
  setFile
}) {
  return (
    <form
      onSubmit={onSend}
      className="border-t px-4 py-3 flex gap-3 w-full items-center"
    > 
    <div className="flex items-center gap-3 flex-1 bg-muted rounded-full px-5 py-3 ">
      {/* <label className="cursor-pointer">
       <Paperclip className="w-5 h-5 text-gray-400 hover:text-white" />

        <input
          type="file"
          value={file}
          className="hidden"
          accept="image/*,video/mp4,application/pdf"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setFile(file);
            console.log("Selected file:", file);
          }}
        />
    </label> */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="flex-1 bg-transparent outline-none text-2xl  placeholder-gray-400"
        
      />
      </div>
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
