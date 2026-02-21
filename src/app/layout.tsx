import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Transforme Sua Mente — Ciência, Fé e a Superação dos Traumas | Ricardo Batista Cavassin",
  description:
    "Baixe gratuitamente o e-book que integra psicanálise, neurociência e fé cristã para a cura de traumas emocionais e restauração de identidade.",
  openGraph: {
    title: "Transforme Sua Mente — E-book Gratuito",
    description:
      "Ciência, Fé e a Superação dos Traumas. Baixe agora o e-book de Ricardo Batista Cavassin.",
    images: ["/capa.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
