import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API,
        withCredentials: true, // สำคัญ เพราะ delete เช็ค login
      }),
    []
  );

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/post/get.php");

      // get.php ส่ง array ตรง ๆ อยู่แล้ว
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("โหลดโพสต์ไม่สำเร็จ");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deletePost = async (postID) => {
    if (!window.confirm("ลบโพสต์นี้ไหม")) return;

    try {
      await api.post("/post/delete.php", { postID });
      load();
    } catch (err) {
      const code = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (code === 401) alert("ยังไม่ได้ล็อกอิน");
      else if (code === 403) alert("ไม่มีสิทธิ์ลบโพสต์นี้");
      else alert(msg || "ลบไม่สำเร็จ");

      console.error(err);
    }
  };

  return (
    <div>
      <h4>จัดการโพสต์</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>รายละเอียด</th>
            <th>หมวดหมู่</th>
            <th>ผู้โพสต์</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.postID}>
              <td>{p.postID}</td>
              <td>{p.postDetail}</td>
              <td>{p.categoryName || "-"}</td>
              <td>{p.userName || "-"}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePost(p.postID)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}

          {posts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                ไม่มีโพสต์
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}