import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "Ready to Occupy Flats in Kumarapuram, Trivandrum | VFIVE Pearl",
  description:
    "VFIVE Pearl offers ready to occupy 2 and 3 BHK flats in Kumarapuram, Trivandrum, about 1 km from Medical College. K-RERA registered. Book a site visit.",
  authors: [{ name: "VFive Homes" }],
  openGraph: {
    title: "Ready to Occupy Flats in Kumarapuram, Trivandrum | VFIVE Pearl",
    description:
      "VFIVE Pearl offers ready to occupy 2 and 3 BHK flats in Kumarapuram, Trivandrum, about 1 km from Medical College. K-RERA registered. Book a site visit.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ready to Occupy Flats in Kumarapuram, Trivandrum | VFIVE Pearl",
    description:
      "VFIVE Pearl offers ready to occupy 2 and 3 BHK flats in Kumarapuram, Trivandrum, about 1 km from Medical College. K-RERA registered. Book a site visit.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
