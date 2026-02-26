import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ทำ client ที่ส่ง cookie/session ตลอด (สำคัญมากสำหรับ admin.php)
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API,
        withCredentials: true,
      }),
    []
  );

  const normalizeList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    return [];
  };

  const load = async () => {
    try {
      // get.php ของ categories มักเป็น public ก็จริง แต่เอาไว้ให้ชัวร์
      const res = await api.get(`/categories/get.php`);
      setCategories(normalizeList(res.data));
    } catch (err) {
      console.error(err);
      setCategories([]);
      alert("โหลดหมวดหมู่ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return alert("กรอกชื่อก่อน");

    setLoading(true);
    try {
      const res = await api.post(`/categories/create.php`, { name: trimmed });

      // รองรับ response แบบ {"status":"success"} / {"status":"error","message":"..."}
      if (res.data?.status === "success") {
        setName("");
        await load();
      } else {
        alert(res.data?.message || "เพิ่มหมวดหมู่ไม่สำเร็จ");
      }
    } catch (err) {
      const code = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (code === 401) alert("ยังไม่ได้ล็อกอิน");
      else if (code === 403) alert("ต้องเป็นแอดมินเท่านั้น");
      else alert(msg || "เพิ่มหมวดหมู่ไม่สำเร็จ (เช็คชื่อซ้ำ/เซิร์ฟเวอร์)");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("ลบจริงไหม")) return;

    setLoading(true);
    try {
      // ฝั่ง PHP มึงน่าจะอ่าน php://input เป็น JSON อยู่แล้ว (เหมือน create.php)
      const res = await api.post(`/categories/delete.php`, { categoriesID: id });

      if (res.data?.status === "success") {
        await load();
      } else {
        alert(res.data?.message || "ลบไม่สำเร็จ");
      }
    } catch (err) {
      const code = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (code === 401) alert("ยังไม่ได้ล็อกอิน");
      else if (code === 403) alert("ต้องเป็นแอดมินเท่านั้น");
      else alert(msg || "ลบไม่สำเร็จ (อาจติด FK หรือเซิร์ฟเวอร์)");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>จัดการหมวดหมู่</h4>

      <form onSubmit={addCategory} className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อหมวดหมู่"
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "..." : "เพิ่ม"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 120 }}>ID</th>
            <th>ชื่อ</th>
            <th style={{ width: 120 }}>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.categoriesID}>
              <td>{c.categoriesID}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={loading}
                  onClick={() => deleteCategory(c.categoriesID)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                ไม่มีข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}