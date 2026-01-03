export default async function Create_url(file){
    res = await fetch("/api/file_save",{
        method: "POST",
        body: file,
    })
    const data = await res.json();
    return data;
}