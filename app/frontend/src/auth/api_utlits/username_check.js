export const checkUsername = async (username) => {
  const res = await fetch("/api/check_username", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username})
  });

  const data = await res.json();
  return data;
};