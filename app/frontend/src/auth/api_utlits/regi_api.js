export const regiUser = async (Name,DOB,Email,Bio,Contry,username, password,e_valadation) => {
  const res = await fetch("/api/regi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      Name,
      DOB,
      Email,
      Bio,
      Contry,
      username, 
      password,
      e_valadation
    })
  });

  const data = await res.json();
  return data;
};