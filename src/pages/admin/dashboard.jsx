import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, users: 0, categories: 0 });
  const [loading, setLoading] = useState(false);

  // ส่ง cookie/session เผื่อ user/get.php เช็ค admin
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API,
        withCredentials: true,
      }),
    []
  );

  // รองรับ response ได้ทั้ง:
  // 1) [] ตรง ๆ
  // 2) { data: [] }
  // 3) { status:"error", message:"..." } -> ให้เป็น []
  const normalizeList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    return [];
  };

  const load = async () => {
    setLoading(true);
    try {
      const [postsRes, usersRes, categoriesRes] = await Promise.all([
        api.get("/post/get.php"),
        // ✅ backend ของมึงเป็น api/user/get.php (ดูจากรูป)
        api.get("/user/get.php"),
        api.get("/categories/get.php"),
      ]);

      const posts = normalizeList(postsRes.data);
      const users = normalizeList(usersRes.data);
      const categories = normalizeList(categoriesRes.data);

      setStats({
        posts: posts.length,
        users: users.length,
        categories: categories.length,
      });
    } catch (err) {
      console.error(err);

      const code = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (code === 401) alert("ยังไม่ได้ล็อกอิน");
      else if (code === 403) alert("ต้องเป็นแอดมินเท่านั้น");
      else alert(msg || "โหลดสถิติไม่สำเร็จ");

      setStats({ posts: 0, users: 0, categories: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="mb-0">Dashboard</h4>
      </div>

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