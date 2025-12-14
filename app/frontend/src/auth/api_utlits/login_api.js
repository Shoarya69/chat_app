export const loginUser = async (username, password) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, Password: password })
  });

  const data = await res.json();
  return data;
};