import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await axios.get(`${API}/categories/get.php`);
    setCategories(Array.isArray(res.data) ? res.data : res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("กรอกชื่อก่อน");

    await axios.post(`${API}/categories/create.php`, { name });
    setName("");
    load();
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("ลบจริงไหม")) return;
    await axios.post(`${API}/categories/delete.php`, { categoriesID: id });
    load();
  };

  return (
    <div>
      <h4>จัดการหมวดหมู่</h4>

      <form onSubmit={addCategory} className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อหมวดหมู่"
        />
        <button className="btn btn-primary">เพิ่ม</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ</th>
            <th>ลบ</th>
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
                  onClick={() => deleteCategory(c.categoriesID)}
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