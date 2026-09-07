import type { Metadata } from "next";
import BookLanding from "@/components/BookLanding";

const siteUrl = "https://www.ricardocavassin.com";

export const metadata: Metadata = {
  title: "Transform Your Mind | Ricardo Batista Cavassin",
  description:
    "Download the free book that brings psychoanalysis, neuroscience, and Christian faith together to support emotional healing and restored identity.",
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      "pt-BR": `${siteUrl}/`,
      en: `${siteUrl}/en`,
    },
  },
  openGraph: {
    title: "Transform Your Mind | Free Book",
    description:
      "Science, Faith, and Overcoming Trauma. Download Ricardo Batista Cavassin's book.",
    url: `${siteUrl}/en`,
    locale: "en_US",
    images: ["/covers/transform-your-mind-cover.png"],
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <BookLanding locale="en" />;
}
