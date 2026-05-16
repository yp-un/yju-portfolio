import { Project } from "../_types/Project";

export default async function getReadme(key: Project["key"]) {
	try {
		const res = await fetch(
			`https://raw.githubusercontent.com/yp-un/yju-portfolio/main/public/${key}/description.md`,
		);
		const text = await res.text();
		return text;
	} catch (e) {
		console.error(e);
	}
}
