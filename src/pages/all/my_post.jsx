import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await axios.get(
      "http://localhost/671463044_7_REACT_API/api/auth/activeUser.php",
      { withCredentials: true }
    );
    if (res.data.status === "success") setUser(res.data.user);
    else setUser(null);
  };

  const fetchPosts = async () => {
    const res = await axios.get(
      "http://localhost/671463044_7_REACT_API/api/post/get.php"
    );
    setPosts(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  // ✅ API ส่ง userID / postID
  const myPosts = posts.filter(
    (post) => user && String(post.userID) === String(user.userID)
  );

  return (
    <div className="container py-4">
      <h3 className="mb-4">โพสต์ของฉัน</h3>

      {myPosts.length === 0 && <p>ยังไม่มีโพสต์</p>}

      <div className="row">
        {myPosts.map((post) => (
          <div key={post.postID} className="col-md-4 mb-3">
            <div
              className="card h-100 shadow-sm"
              onClick={() => navigate(`/post/${post.postID}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                {/* ✅ title = topicName */}
                <h5 className="card-title">{post.topicName || "(ไม่มีหัวข้อ)"}</h5>

                {/* ✅ content = postDetail */}
                <p className="card-text">
                  {(post.postDetail || "").substring(0, 100)}
                  {post.postDetail ? "..." : ""}
                </p>
              </div>

              <div className="card-footer text-muted">
                ❤️ {post.likes ?? 0} ไลค์
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}