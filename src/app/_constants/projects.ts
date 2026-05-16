import type { Project } from "@/app/_types/Project";

export const projects: Project[] = [
	{
		id: "4",
		title: "YourMillionaire",
		skills: ["Next.js", "React", "MFE", "AWS", "CloudFront"],
		thumbnail: "/yourmillionaire/1.webp",
		images: Array.from({ length: 6 }).map(
			(_, i) => `/yourmillionaire/${i + 1}.webp`,
		),
		introduce: "AI 회계",
		githubUrl: "https://github.com/yp-un/yourmillionaire-frontend",
		serviceUrl: "https://yourmillionaire.kro.kr/",
		readme: {
			owner: "yp-un",
			repo: "yju-portfolio",
			filePath: "public/yourmillionaire/description.md",
		},
	},
	{
		id: "3",
		title: "Shathing",
		skills: ["Next.js", "Spring Boot", "WebSocket", "PostgreSQL"],
		thumbnail: "/shathing/1.webp",
		images: Array.from({ length: 8 }).map((_, i) => `/shathing/${i + 1}.webp`),
		introduce: "물건 공유 플랫폼",
		githubUrl: "https://github.com/orgs/shathing/repositories",
		serviceUrl: "https://shathing.shop",
		readme: {
			owner: "yp-un",
			repo: "yju-portfolio",
			filePath: "public/shathing/description.md",
		},
	},
	{
		id: "2",
		title: "Tripplai",
		skills: ["Next.js", "TypeScript", "Zustand", "ReactQuery", "Tailwind CSS"],
		thumbnail: "/tripplai/1.webp",
		images: Array.from({ length: 5 }).map((_, i) => `/tripplai/${i + 1}.webp`),
		introduce: "AI 기반 여행 계획 플랫폼",
		githubUrl: "https://github.com/Tripplai/client",
		serviceUrl: "https://tripplai.vercel.app",
		readme: {
			owner: "yp-un",
			repo: "yju-portfolio",
			filePath: "public/tripplai/description.md",
		},
	},
	{
		id: "1",
		title: "yju-portfolio",
		skills: ["Next.js", "TypeScript", "Sass"],
		thumbnail: "/og-image.webp",
		images: process.env.NEXT_PUBLIC_BASE_URL!,
		introduce: "포트폴리오",
		githubUrl: "https://github.com/yp-un/yju-portfolio",
		serviceUrl: "https://yju-portfolio.com",
		readme: {
			owner: "yp-un",
			repo: "yju-portfolio",
			filePath: "public/portfolio/description.md",
		},
	},
];

export function getProjectById(id: string) {
	return projects.find((project) => project.id === id);
}
