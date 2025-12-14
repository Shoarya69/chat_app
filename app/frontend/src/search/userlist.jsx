
import { Link } from "react-router-dom";
import { UserListcss } from "./searchcss";
export default function UserList({ data }) {
  return (
    <div className={UserListcss.main_content}>
      <div className={UserListcss.main_inner}>
        {data.map((u) => (
          <div key={u.id} className={UserListcss.flashcard}>
            <div className="card-body">
              <h2 className="card-title">{u.username}</h2>
              <p>User ID: {u.id}</p>
              <div className={UserListcss.inner_card}>
                <button className={UserListcss.profile_view}><Link to={`/user/${u.id}`} >View Profile</Link></button>
              </div>
          </div>
            </div>
        ))}
      </div>
    </div>
  );
}
