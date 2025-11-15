import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <header>
          <nav>
            <Link className="nav-link" href="/">
              Home
            </Link>
            <div>
              <Link className="nav-link" href="/dashboard">
                Dashboard
              </Link>
              <Link className="nav-link" href="/register">
                Register
              </Link>
              <Link className="nav-link" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 tegaensler@gmail.com</p>
        </footer>
      </body>
    </html>
  );
}
