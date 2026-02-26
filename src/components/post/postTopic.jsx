import { useEffect, useState } from "react";
import Axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function PostCreateModal({ categories = [], user, onCreated }) {
  const [categoriesID, setCategoriesID] = useState("");
  const [topicName, setTopicName] = useState("");
  const [postDetail, setPostDetail] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!categoriesID && categories.length > 0) {
      setCategoriesID(String(categories[0].categoriesID));
    }
  }, [categories, categoriesID]);

  const closeModal = () => {
    const el = document.getElementById("createTopicModal");
    if (!el) return;
    const modal =
      window.bootstrap?.Modal?.getInstance(el) || new window.bootstrap.Modal(el);
    modal.hide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("ต้องล็อกอินก่อนถึงจะโพสต์ได้");
    if (!categoriesID) return alert("เลือกหมวดหมู่ก่อน");
    if (!topicName.trim()) return alert("ใส่ชื่อกระทู้ก่อน");
    if (!postDetail.trim()) return alert("ใส่รายละเอียดโพสต์ก่อน");
    if (!postImage) return alert("เลือกรูปก่อน");

    try {
      setSaving(true);

      // 1) ✅ create topic (ยิงไป topic/create.php)
      const fdTopic = new FormData();
      fdTopic.append("topicName", topicName.trim());
      fdTopic.append("categoriesID", String(categoriesID));

      const tRes = await Axios.post(`${API}/topic/create.php`, fdTopic, {
        withCredentials: true,
      });

      const topicID = tRes.data?.topicID;
      if (!topicID) throw new Error(tRes.data?.message || "API ไม่ได้ส่ง topicID");

      // 2) ✅ create post + upload รูป (ยิงไป post/create.php)
      const fdPost = new FormData();
      fdPost.append("topicID", String(topicID));
      fdPost.append("postDetail", postDetail.trim());
      fdPost.append("postImage", postImage); // ชื่อ field ต้องตรง PHP: $_FILES['postImage']

      const pRes = await Axios.post(`${API}/post/create.php`, fdPost, {
        withCredentials: true,
        // ❌ ไม่ต้องใส่ Content-Type เอง
      });

      // ถ้าอยากโชว์ message จาก API:
      // alert(pRes.data?.message || "โพสต์สำเร็จ");
      alert("โพสต์สำเร็จ");

      setTopicName("");
      setPostDetail("");
      setPostImage(null);
      closeModal();
      onCreated?.();
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "โพสต์ไม่สำเร็จ";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade" id="createTopicModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">สร้างกระทู้ใหม่</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">หมวดหมู่</label>
                <select
                  className="form-select"
                  value={categoriesID}
                  onChange={(e) => setCategoriesID(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.categoriesID} value={c.categoriesID}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">ชื่อกระทู้</label>
                <input
                  type="text"
                  className="form-control"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">รายละเอียดโพสต์</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={postDetail}
                  onChange={(e) => setPostDetail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">รูปภาพ</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files?.[0] || null)}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary w-50" data-bs-dismiss="modal" disabled={saving}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-success w-50" disabled={saving}>
                  {saving ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}