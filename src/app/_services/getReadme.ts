import { Project } from "../_types/Project";

export default async function getReadme(key: Project["key"]) {
	try {
		const res = await fetch(
			`/${key}/description.md`,
		);
		if (!res.ok) throw new Error(`프로젝트 설명을 불러오지 못했습니다: ${res.status}`);
		const text = await res.text();
		return text;
	} catch (e) {
		console.error(e);
	}
}
