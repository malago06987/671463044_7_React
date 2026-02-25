import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import Navbar from "../../components/include/Navbar";
import PostList from "../../components/post/postList";

export default function Category() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost/671463044_7_REACT_API/api/categories/get.php")
      .then((res) =>
        setCategories(Array.isArray(res.data) ? res.data : res.data.data || [])
      )
      .catch(() => setCategories([]));
  }, []);

  // ✅ ดึงโพสต์ “ตามหมวด” จากหลังบ้านเลย
  useEffect(() => {
    Axios.get(
      `http://localhost/671463044_7_REACT_API/api/post/get.php?categoriesID=${id}`
    )
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setPosts([]));
  }, [id]);

  const categoryName = useMemo(() => {
    const found = categories.find((c) => String(c.categoriesID) === String(id));
    return found ? found.name : `หมวด #${id}`;
  }, [categories, id]);

  return (
    <>
      <Navbar categories={categories} />

      <div className="container py-4">
        <h2 className="mb-2">{categoryName}</h2>
        <div className="text-muted mb-3">ทั้งหมด: {posts.length} โพสต์</div>

        <PostList items={posts} />

        {posts.length === 0 && (
          <p className="text-muted mt-3">หมวดนี้ยังไม่มีโพสต์</p>
        )}
      </div>
    </>
  );
}