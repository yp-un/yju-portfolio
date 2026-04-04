import { Project } from "../_types/Project";

export default async function getReadme(readme: Project["readme"]) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${readme.owner}/${readme.repo}/${readme.branch ?? "main"}/${readme.filePath ?? "README.md"}`);
    const text = await res.text()
    return text
  } catch (e) {
    console.error(e)
  }
}