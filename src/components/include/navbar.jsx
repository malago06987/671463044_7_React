import { Link } from "react-router-dom";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function Navbar({ user, categories = [], onLogout }) {
  const profileSrc = user?.userImage ? `${API}/${user.userImage}` : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-semibold" to="/">
          Webboard
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                หน้าแรก
              </Link>
            </li>

            {/* Categories dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                หมวดหมู่
              </a>

              <ul className="dropdown-menu">
                {categories.length === 0 ? (
                  <li>
                    <span className="dropdown-item-text text-muted">
                      ยังไม่มีหมวดหมู่
                    </span>
                  </li>
                ) : (
                  categories.map((c) => (
                    <li key={c.categoriesID}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.categoriesID}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </li>

            {/* Create post */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link className="btn btn-primary btn-sm" to="/create">
                + ตั้งกระทู้ใหม่
              </Link>
            </li>
          </ul>

          {/* Right side: Auth */}
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    เข้าสู่ระบบ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
                    to="/register"
                  >
                    สมัครสมาชิก
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  {profileSrc ? (
                    <img
                      src={profileSrc}
                      alt="profile"
                      width="28"
                      height="28"
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        // ถ้าไฟล์หาย/พาธผิด ให้ fallback เป็นไอคอน
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span
                      className="rounded-circle bg-secondary d-inline-flex justify-content-center align-items-center"
                      style={{ width: 28, height: 28, fontSize: 14 }}
                    >
                      👤
                    </span>
                  )}
                  <span>{user.userName || "ผู้ใช้"}</span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      โปรไฟล์
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-posts">
                      กระทู้ของฉัน
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => onLogout && onLogout()}
                      type="button"
                    >
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}