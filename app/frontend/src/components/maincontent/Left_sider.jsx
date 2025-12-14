import Left_css from "../css/left_sidecss";
export default function left_side(){
    return (
        <div className={Left_css.chat_window}>
                <h2 className="text-lg font-bold p-4 border-b">Chats</h2>
                <ul>
                  <li className="p-3 hover:bg-gray-200 cursor-pointer">Friend 1</li>
                  <li className="p-3 hover:bg-gray-200 cursor-pointer">Friend 2</li>
                  <li className="p-3 hover:bg-gray-200 cursor-pointer">Friend 3</li>
                </ul>
        </div>
    );
}