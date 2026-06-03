import type { Metadata } from "next";
import "@/app/_styles/globals.scss";
import { Suspense } from "react";
import Footer from "@/app/_components/footer/Footer";
import Loading from "@/app/_components/loading/Loading";
import Nav from "@/app/_components/nav/Nav";

const title = "양정운 포트폴리오";
const description = "개발자 양정운 포트폴리오";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
	title: {
		default: title,
		template: `%s - ${title}`,
	},
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
				<meta
					name="naver-site-verification"
					content="9d759caae2037013bbb21a3511052c7ff2afcb31"
				/>
				{/* <!-- Google tag (gtag.js) --> */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
				/>
				<script>
					{`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');`}
				</script>
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
