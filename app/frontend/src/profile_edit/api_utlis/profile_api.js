export default async function getProfile(token) {
  try {
    const res = await fetch("/api/self_profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // <-- send token in header
      }
    });

    // Convert response to JSON
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return { error: "Something went wrong with API" };
  }
}
