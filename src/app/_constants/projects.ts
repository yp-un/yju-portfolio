import type { Project } from "@/app/_types/Project";

export const projects: Project[] = [
	{
		key: "yourmillionaire",
		title: "YourMillionaire",
		skills: ["Next.js", "React", "MFE", "AWS", "CloudFront"],
		imgCnt: 6,
		introduce: "AI 회계",
		githubUrl: "https://github.com/yp-un/yourmillionaire-frontend",
		serviceUrl: "https://yourmillionaire.kro.kr/",
	},
	{
		key: "shathing",
		title: "Shathing",
		skills: ["Next.js", "Spring Boot", "WebSocket", "PostgreSQL"],
		imgCnt: 8,
		introduce: "물건 공유 플랫폼",
		githubUrl: "https://github.com/orgs/shathing/repositories",
		serviceUrl: "https://shathing.shop",
	},
	{
		key: "tripplai",
		title: "Tripplai",
		skills: ["Next.js", "TypeScript", "Zustand", "ReactQuery", "Tailwind CSS"],
		imgCnt: 5,
		introduce: "AI 기반 여행 계획 플랫폼",
		githubUrl: "https://github.com/Tripplai/client",
		serviceUrl: "https://tripplai.vercel.app",
	},
	{
		key: "portfolio",
		title: "yju-portfolio",
		skills: ["Next.js", "TypeScript", "Sass"],
		imgCnt: 1,
		introduce: "포트폴리오",
		githubUrl: "https://github.com/yp-un/yju-portfolio",
		serviceUrl: "https://yju-portfolio.com",
	},
];

export function getProjectByKey(key: string) {
	return projects.find((project) => project.key === key);
}
