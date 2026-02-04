import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from '@/lib/SettingsContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DDS Almoxarifado",
  description: "Diálogo Diário de Segurança para a equipe do Almoxarifado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
