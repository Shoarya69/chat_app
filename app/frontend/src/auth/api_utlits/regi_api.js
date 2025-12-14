export const regiUser = async (username, password) => {
  const res = await fetch("/api/regi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, Password: password })
  });

  const data = await res.json();
  return data;
};