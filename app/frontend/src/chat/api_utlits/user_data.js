export default async function Fetchdata(id){
    try {
        const res = await fetch(`/api/user/${id}`)
        const data = await res.json();
        if(data.username){
            return data;
        }
    } catch (error) {
        console.log("The error is ",error)
        return null;        
    }
}