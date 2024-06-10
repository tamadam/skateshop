import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import ToastProvider from "./providers/ToastProvider";
import Footer from "./components/Footer/Footer";
import CartWrapper from "./providers/Cart/CartWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skateshop",
  description: "Skateboards and accessories webshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartWrapper>
          <ToastProvider />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </CartWrapper>
      </body>
    </html>
  );
}
