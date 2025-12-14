export default function inputbox(){
    return(
        <div className="p-4 border-t flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow border rounded-full px-4 py-2 mr-2"
          />
          <button className="btn btn-primary rounded-full px-4 py-2">Send</button>
    </div>
    );
      
    
}