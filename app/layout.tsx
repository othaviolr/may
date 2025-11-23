import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Para meu Amor ❤️",
  description: "Um presente especial cheio de amor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}