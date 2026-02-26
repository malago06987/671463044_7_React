import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await axios.get(`${API}/users/get.php`);
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("ลบผู้ใช้นี้ไหม")) return;
    await axios.post(`${API}/users/delete.php`, { user_id: id });
    load();
  };

  return (
    <div>
      <h4>จัดการผู้ใช้</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ</th>
            <th>Email</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.user_name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u.user_id)}
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