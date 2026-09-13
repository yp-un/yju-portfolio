"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import {
	Fragment,
	isValidElement,
	type ReactNode,
	useEffect,
	useId,
	useState,
} from "react";
import type { Project } from "@/app/_types/Project";
import style from "./Markdown.module.scss";

let mermaidModulePromise: Promise<typeof import("mermaid")> | null = null;

function getTextContent(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(getTextContent).join("");
	if (isValidElement<{ children?: ReactNode }>(node))
		return getTextContent(node.props.children);
	return "";
}

async function getMermaid() {
	mermaidModulePromise ??= import("mermaid");
	return mermaidModulePromise;
}

function MermaidCode({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	const [svg, setSvg] = useState("");
	const [error, setError] = useState("");
	const diagramId = useId().replace(/:/g, "");
	const isMermaid =
		typeof className === "string" && /\blanguage-mermaid\b/i.test(className);
	const code = getTextContent(children).replace(/\n$/, "");

	useEffect(() => {
		if (!isMermaid || !code) return;

		let ignore = false;

		async function renderDiagram() {
			try {
				const mermaid = await getMermaid();
				mermaid.default.initialize({
					startOnLoad: false,
					theme: "neutral",
					securityLevel: "strict",
				});

				const { svg: nextSvg } = await mermaid.default.render(
					`mermaid-${diagramId}`,
					code,
				);

				if (!ignore) {
					setSvg(nextSvg);
					setError("");
				}
			} catch (err) {
				if (!ignore) {
					setSvg("");
					setError(
						err instanceof Error
							? err.message
							: "Failed to render mermaid diagram.",
					);
				}
			}
		}

		renderDiagram();

		return () => {
			ignore = true;
		};
	}, [code, diagramId, isMermaid]);

	if (!isMermaid) return <code className={className}>{children}</code>;

	if (error) {
		return (
			<pre>
				<code className={className}>{code}</code>
			</pre>
		);
	}

	if (!svg) return <code className={className}>{code}</code>;

	return <div data-name="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default function Markdown({
	projectKey,
}: {
	projectKey: Project["key"] | undefined;
}) {
	const [text, setText] = useState<string | null>(null);
	const [error, setError] = useState(false);
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let active = true;
		const controller = new AbortController();
		setText(null);
		setError(false);

		async function fetchReadme() {
			try {
				if (!projectKey) throw new Error("Missing project key");
				const response = await fetch(`/${projectKey}/description.md`, { signal: controller.signal });
				if (!response.ok) throw new Error("Project description unavailable");
				const readmeText = await response.text();
				if (!readmeText.trim()) throw new Error("Project description is empty");
				if (active) {
					setText(readmeText
						.replace(/^# .+\r?\n/, "")
						.replaceAll("https://raw.githubusercontent.com/yp-un/yju-portfolio/main/public/", "/"));
				}
			} catch {
				if (active) setError(true);
			}
		}

		fetchReadme();
		return () => { active = false; controller.abort(); };
	}, [projectKey, attempt]);

	if (error) {
		return (
			<div className={style.error} role="status">
				<p>프로젝트 설명을 불러오지 못했습니다.</p>
				<button type="button" onClick={() => setAttempt((value) => value + 1)}>다시 불러오기 ↻</button>
			</div>
		);
	}

	if (text == null) {
		return (
			<div className={style.skeleton} aria-label="프로젝트 설명을 불러오는 중" role="status">
				<div className={style.title} />
				{Array.from({ length: 2 }, (_, idx) => (
					<Fragment key={idx}>
						<div className={style.line} />
						<div className={`${style.line} ${style.wide}`} />
						<div className={`${style.line} ${style.medium}`} />
						<div className={style.block} />
						<div className={style.line} />
						<div className={`${style.line} ${style.short}`} />
					</Fragment>
				))}
			</div>
		);
	}

	return (
		<MarkdownPreview
			source={text}
			components={{
				code: ({ children, className }) => (
					<MermaidCode className={className}>{children}</MermaidCode>
				),
			}}
		/>
	);
}
