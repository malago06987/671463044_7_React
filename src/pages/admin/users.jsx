import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API,
        withCredentials: true,
      }),
    []
  );

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/get.php");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("โหลดผู้ใช้ไม่สำเร็จ");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteUser = async (userID) => {
    if (!window.confirm("ลบผู้ใช้นี้ไหม")) return;

    try {
      const res = await api.post("/user/delete.php", { userID });
      if (res.data?.status === "success") {
        load();
      } else {
        alert(res.data?.message || "ลบไม่สำเร็จ");
      }
    } catch (err) {
      const code = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (code === 401) alert("ยังไม่ได้ล็อกอิน");
      else if (code === 403) alert("ต้องเป็นแอดมินเท่านั้น");
      else alert(msg || "ลบไม่สำเร็จ");

      console.error(err);
    }
  };

  return (
    <div>
      <h4>จัดการผู้ใช้</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: 100 }}>ID</th>
            <th>ชื่อ</th>
            <th>Email</th>
            <th style={{ width: 120 }}>Role</th>
            <th style={{ width: 120 }}>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userID}>
              <td>{u.userID}</td>
              <td>{u.userName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={loading}
                  onClick={() => deleteUser(u.userID)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                ไม่มีผู้ใช้
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}