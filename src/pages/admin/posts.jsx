import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    const res = await axios.get(`${API}/post/get.php`);
    setPosts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("ลบโพสต์นี้ไหม")) return;
    await axios.post(`${API}/post/delete.php`, { id });
    load();
  };

  return (
    <div>
      <h4>จัดการโพสต์</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>หัวข้อ</th>
            <th>หมวดหมู่</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.post_id}>
              <td>{p.post_id}</td>
              <td>{p.title}</td>
              <td>{p.category_name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePost(p.post_id)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}