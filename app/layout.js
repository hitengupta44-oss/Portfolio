import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/jetbrains-mono";
import { profile } from "@/lib/resume";
import "./globals.css";

export const metadata = {
  title: `${profile.name} | ${profile.shortRole}`,
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: ["Hiten Gupta", "AI", "Machine Learning", "Data Analyst", "Backend", "NLP", "LLMs", "Internship", "Portfolio"],
  openGraph: {
    title: `${profile.name} | ${profile.shortRole}`,
    description: profile.summary,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070b14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
