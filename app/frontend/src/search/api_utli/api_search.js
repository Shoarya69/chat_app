export const searchUser = async (username) => {
  const res = await fetch(`/api/search?user=${encodeURIComponent(username)}`);

  const data = await res.json();
  return data;
};