import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    users: 0,
    categories: 0
  });

  const load = async () => {
    const [posts, users, categories] = await Promise.all([
      axios.get(`${API}/post/get.php`),
      axios.get(`${API}/users/get.php`),
      axios.get(`${API}/categories/get.php`)
    ]);

    setStats({
      posts: posts.data.length || 0,
      users: users.data.length || 0,
      categories: categories.data.length || 0
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h4>Dashboard</h4>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>โพสต์</h6>
            <h3>{stats.posts}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>ผู้ใช้</h6>
            <h3>{stats.users}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 text-center">
            <h6>หมวดหมู่</h6>
            <h3>{stats.categories}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}