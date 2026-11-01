import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:
    "CORTEJO · Distribuir convidados fictícios em mesas com capacidades e incompatibilidades",
  description:
    "Distribuir convidados fictícios em mesas com capacidades e incompatibilidades",
  metadataBase: new URL("https://cortejo-gustapaz.starrylinen.chatgpt.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CORTEJO",
    description:
      "Distribuir convidados fictícios em mesas com capacidades e incompatibilidades",
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
