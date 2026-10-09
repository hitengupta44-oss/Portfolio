import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import { profile } from "@/lib/resume";
import "./globals.css";

export const metadata = {
  title: `${profile.name} · ${profile.shortRole}`,
  description: profile.summary,
  authors: [{ name: profile.name, url: profile.linkedin }],
  keywords: ["Hiten Gupta", "Machine Learning Engineer", "Data Analyst", "NLP", "Agentic AI", "Portfolio"],
  openGraph: {
    title: `${profile.name} · ${profile.shortRole}`,
    description: profile.summary,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#03040a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
