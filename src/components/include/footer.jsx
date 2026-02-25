export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container text-center">
        <div className="mb-2">
          <a href="/" className="text-light text-decoration-none me-3">
            หน้าแรก
          </a>
          <a href="/about" className="text-light text-decoration-none me-3">
            เกี่ยวกับเรา
          </a>
          <a href="/contact" className="text-light text-decoration-none">
            ติดต่อ
          </a>
        </div>

        <small className="text-secondary">
          © {new Date().getFullYear()} นายเดชา ลาคำ
        </small>
      </div>
    </footer>
  );
}