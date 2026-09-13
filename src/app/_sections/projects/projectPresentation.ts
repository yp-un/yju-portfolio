import type { Project } from "@/app/_types/Project";

interface ProjectPresentation {
	category: "AI" | "Platform" | "Portfolio";
	label: string;
	date: string;
	role: string;
	description: string;
	color: string;
	number: string;
}

const presentation: Record<string, ProjectPresentation> = {
	yourmillionaire: {
		category: "AI",
		label: "AI · FINANCE",
		date: "2026.05",
		role: "Frontend & Infrastructure",
		description: "복잡한 회계를 더 간단하게. 랜딩부터 대시보드, AWS 배포까지 설계한 AI 회계 서비스.",
		color: "#e1e8df",
		number: "01",
	},
	shathing: {
		category: "Platform",
		label: "SHARING PLATFORM",
		date: "2026.01 — 03",
		role: "Full-stack · Solo project",
		description: "필요한 물건을 빌리고, 함께 쓰는 일상. 웹과 앱, 실시간 채팅까지 직접 만든 공유 플랫폼.",
		color: "#e8e4f0",
		number: "02",
	},
	tripplai: {
		category: "AI",
		label: "AI · TRAVEL",
		date: "2025.04 — 10",
		role: "Frontend · Team project",
		description: "여행의 시작을 더 가볍게. AI 여행 추천과 축제 정보, 결제를 연결한 여행 계획 플랫폼.",
		color: "#e0ebf1",
		number: "03",
	},
	portfolio: {
		category: "Portfolio",
		label: "PERSONAL WEBSITE",
		date: "2025.01 — Present",
		role: "Design & Development",
		description: "개발자로서의 생각과 경험을 담은 공간. 기획부터 디자인, 개발까지 직접 쌓아가는 포트폴리오.",
		color: "#ecebcf",
		number: "04",
	},
};

export function getProjectPresentation(project: Project): ProjectPresentation {
	return presentation[project.key] ?? {
		category: "Platform",
		label: "WEB PROJECT",
		date: "",
		role: "Development",
		description: project.introduce,
		color: "#e1e8df",
		number: "—",
	};
}
