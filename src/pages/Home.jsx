import { useEffect, useState } from "react";
import Axios from "axios";
import SearchData from "../components/SearchData";
import Paginator from "../components/Paginator";
import DisplayPosts from "../components/DisplayPosts";

// ✅ แก้ให้ตรงโปรเจ็คมึง
const BASE_URL = "http://localhost/671463044_7_REACT_API";

function Home() {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = () => {
    Axios.get(`${BASE_URL}/api/post/get.php`).then((res) => {
      setPostList(res.data || []);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredPostList = postList.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      (p.topicName || "").toLowerCase().includes(q) ||
      (p.postDetail || "").toLowerCase().includes(q) ||
      (p.categoryName || "").toLowerCase().includes(q) ||
      String(p.postID || "").includes(q)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPostList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pb-4">
      <h1 className="mb-3">โพสต์ทั้งหมด</h1>

      <SearchData
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        placeholder="ค้นหาโพสต์ (หัวข้อ/เนื้อหา/หมวด/ID)..."
      />

      <Paginator
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredPostList.length}
        setCurrentPage={setCurrentPage}
      />

      <DisplayPosts currentItems={currentItems} />
    </div>
  );
}

export default Home;