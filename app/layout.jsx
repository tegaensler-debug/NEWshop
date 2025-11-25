import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { myFont } from "@/lib/fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={myFont.className}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
