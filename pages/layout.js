import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Egala Spot",
  description: "Egala Spot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
