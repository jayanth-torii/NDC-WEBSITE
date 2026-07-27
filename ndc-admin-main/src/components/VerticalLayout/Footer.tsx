// Mirrors NCET admin's Footer.js — brand + copyright / "Powered by" row.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer admin-footer">
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
        <span>
          © {year} <b>Nagarjuna Degree College</b>. All Rights Reserved.
        </span>
        <a
          href="https://toriiminds.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-muted"
        >
          Powered by Torii Minds
        </a>
      </div>
    </footer>
  );
}
