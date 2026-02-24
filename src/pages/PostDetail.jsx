import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BASE_URL = "http://localhost/671463044_7_REACT_API";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    Axios.get(`${BASE_URL}/api/post/get_one.php?id=${id}`).then((res) => {
      // ถ้า API มึงส่งเป็น object ก็ใช้ res.data ได้เลย
      setPost(res.data || null);
    });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="pb-4">
      <Button as={Link} to="/" variant="secondary" className="mb-3">
        ← กลับหน้าแรก
      </Button>

      <Card>
        {post.postImag && <Card.Img variant="top" src={post.postImag} />}
        <Card.Body>
          <Card.Title>{post.topicName || "ไม่มีหัวข้อ"}</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-wrap" }}>
            {post.postDetail || "-"}
          </Card.Text>
          <div className="text-muted">
            PostID: {post.postID} | 👍 {post.likes || 0}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostDetail;