import type { Metadata } from "next";
import { Oxanium, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from '@/lib/SettingsContext';

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-display" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
      <body className={`${oxanium.variable} ${jetbrains.variable}`}>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
