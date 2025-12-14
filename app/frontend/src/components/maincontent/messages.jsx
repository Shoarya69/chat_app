export default function message(){
    return (
        <div className="p-4 flex flex-col space-y-2 overflow-y-auto h-[70vh]">
          {/* Messages */}
          <div className="self-start bg-gray-200 text-black p-2 rounded-lg max-w-xs">Hi there!</div>
          <div className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-xs">Hello!</div>
          <div className="self-start bg-gray-200 text-black p-2 rounded-lg max-w-xs">How are you?</div>
          <div className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-xs">I'm good, you?</div>
        </div>
    );
}