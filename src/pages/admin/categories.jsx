import { useEffect, useState } from "react";
import Axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    Axios.get("http://localhost/671463044_7_REACT_API/api/categories/get.php")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const addCategory = () => {
    Axios.post(
      "http://localhost/671463044_7_REACT_API/api/categories/create.php",
      { name: newName }
    ).then(() => {
      setNewName("");
      loadCategories();
    });
  };

  return (
    <div className="container py-4">
      <h2>จัดการหมวดหมู่</h2>

      <div className="mb-3">
        <input
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="ชื่อหมวดหมู่"
        />
        <button className="btn btn-primary mt-2" onClick={addCategory}>
          เพิ่มหมวด
        </button>
      </div>

      <ul className="list-group">
        {categories.map((c) => (
          <li key={c.categoriesID} className="list-group-item">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}