import type { Metadata } from "next";
import BookLanding from "@/components/BookLanding";

const siteUrl = "https://www.ricardocavassin.com";

export const metadata: Metadata = {
  title: "Transforme Sua Mente | Ricardo Batista Cavassin",
  description:
    "Baixe gratuitamente o livro que integra psicanálise, neurociência e fé cristã para a cura de traumas emocionais e a restauração da identidade.",
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      "pt-BR": `${siteUrl}/`,
      en: `${siteUrl}/en`,
    },
  },
  openGraph: {
    title: "Transforme Sua Mente | Livro gratuito",
    description:
      "Ciência, Fé e a Superação dos Traumas. Baixe o livro de Ricardo Batista Cavassin.",
    url: `${siteUrl}/`,
    locale: "pt_BR",
    images: ["/covers/transforme-sua-mente-cover-portuguese.png"],
    type: "website",
  },
};

export default function HomePage() {
  return <BookLanding locale="pt" />;
}
