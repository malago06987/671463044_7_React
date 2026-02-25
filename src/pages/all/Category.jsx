import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import Navbar from "../../components/include/navbar";
import PostList from "../../components/post/postList";

export default function Category() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost/671463044_7_React_API/api/post/get.php?categoriesID=${id}`)
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h4 className="mb-3">หมวดหมู่: {id}</h4>
        <PostList items={posts} />
        {posts.length === 0 && <p className="text-muted mt-3">ไม่พบกระทู้ในหมวดนี้</p>}
      </div>
    </>
  );
}