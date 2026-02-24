export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Webboard Mini System
        </small>
      </div>
    </footer>
  );
}