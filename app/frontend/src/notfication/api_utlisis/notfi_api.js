export default async function fetchNotifications(token){
            try {
                const res = await fetch(`/api/notfi/${token}`);
                const data = await res.json();

                if (data.Notfi) {
                    console.log("api:- ",data);
                    return data;
                }
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
}



