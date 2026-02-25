import { useEffect, useMemo, useState } from "react";
import Axios from "axios";

import Navbar from "../../components/include/Navbar";
import Search from "../../components/others/search";
import PostList from "../../components/post/postList";

// ถ้ามึงยังไม่มี Paginator component ให้กูทำให้ต่อด้านล่าง
import Paginator from "../../components/others/paginator";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
const [categories, setCategories] = useState([]);

useEffect(() => {

  // ดึงหมวดหมู่
  fetch("http://localhost/671463044_7_REACT_API/api/categories/get.php")
    .then((r) => r.json())
    .then((data) =>
      setCategories(Array.isArray(data) ? data : data.data || [])
    )
    .catch(() => setCategories([]));

  // ดึงโพสต์
  Axios.get("http://localhost/671463044_7_REACT_API/api/post/get.php")
    .then((res) =>
      setPosts(Array.isArray(res.data) ? res.data : [])
    )
    .catch((err) => console.error(err));

}, []);
const [view, setView] = useState("list"); // "grid" | "list"
  // 2) ค้นหา (filter)
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((p) => {
      const postDetail = (p.postDetail || "").toLowerCase();
      const topicName = (p.topicName || "").toLowerCase();
      const categoryName = (p.categoryName || "").toLowerCase();
      const nickName = (p.nickName || "").toLowerCase();

      return (
        postDetail.includes(q) ||
        topicName.includes(q) ||
        categoryName.includes(q) ||
        nickName.includes(q)
      );
    });
  }, [posts, searchQuery]);

  // 3) แบ่งหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar categories={categories} user={null} onLogout={null} />

      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="m-0">หน้าแรกเว็บบอร์ด</h2>
          <span className="text-muted">ทั้งหมด: {filtered.length} โพสต์</span>
        </div>

        <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

        <Paginator
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filtered.length}
          setCurrentPage={setCurrentPage}
        />

        <PostList items={currentItems} />

        {filtered.length === 0 && (
          <p className="text-muted mt-3">ยังไม่มีโพสต์ หรือไม่พบผลลัพธ์</p>
        )}
      </div>
    </>
  );
}