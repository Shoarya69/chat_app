export default async function Email_val_api(Email){
    const res = await fetch("/api/otpsend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email : Email })
  });

  const data = await res.json();
  return data;
}