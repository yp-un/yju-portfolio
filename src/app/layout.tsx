import type { Metadata } from "next";
import "@/app/_styles/globals.scss";
import Nav from "@/app/_sections/nav/Nav";
import Footer from "@/app/_sections/footer/Footer";
import { Suspense } from "react";
import Loading from "./_sections/loading/Loading";

const title = "양정운 포트폴리오";
const description = "프론트엔드 개발자 양정운 포트폴리오";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: {
      url: "/og-image.webp",
      width: 1200,
      height: 630,
      alt: "yju-portfolio 이미지",
    },
  },
};

export default function RootLayout({
  children,
  projectModal,
}: Readonly<{
  children: React.ReactNode;
  projectModal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="9d759caae2037013bbb21a3511052c7ff2afcb31" />
      </head>
      <body>
        <header>
          <nav>
            <Nav />
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        <Suspense fallback={<Loading />}>{projectModal}</Suspense>
      </body>
    </html>
  );
}
