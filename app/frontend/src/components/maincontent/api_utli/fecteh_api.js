export default async function fetchFriend(tok){
        try {
                const res = await fetch(`/api/friends/${tok}`);
                const data = await res.json();

                if (data.friends) {
                    return data;
                }
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
}   