import { useEffect, useState } from "react";
import fetchNotifications from "./api_utlisis/notfi_api";
import { Link } from "react-router-dom";
export default function Notfi() {
    const [messages, setMessages] = useState([]);
    const [user_id, setuser] = useState("");
    useEffect(() => {
    const load = async () => {
        const user_id1 = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        if (user_id1) setuser(user_id1);

        // Fetch offline notifications
        const data = await fetchNotifications(token);

        if (data.Notfi) {
             const { user_name, user_id } = data.Notfi;

            const combined = user_name.map((name, idx) => ({
                type: "friend_request",
                from_id: user_id[idx],
                from_name: name
            }));

            setMessages(prev => {
                const newOnes = combined.filter(
                    n => !prev.some(p => p.from_id === n.from_id)
                );
                return [...prev, ...newOnes];
            });
}

    };

    load();
}, []);

    return (
        <div className="flex flex-col items-center justify-center bg-base-100 w-full justify-items-center">
            <h2 className="font-extrabold text-2xl  text-white p-4 ">Notifications for {user_id}</h2>
            <ul className="rounded-2xl w-full flex flex-col items-center  p-4 ">
                {messages.map((msg, i) => (
                    <Link to={`/user/${msg.from_id}`} key={i} className="bg-base-300  w-3/4 justify-items-center text-red-600 border-4 border-red p-4 mb-4 rounded-2xl hover:border-green-200 hover:bg-black">
                        {msg.type === "friend_request" && (
                            <>
                                <b className="text-green-700 font-bold font-sans text-xl" >{msg.from_name}</b> sent you a friend request
                            </>
                        )}
                    </Link>
                ))}
            </ul>
        </div>
    );
}
