import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import hljs from "highlight.js";

interface GistPreviewProps {
	gistId: string;
	isValid: boolean;
}

interface GistApiResponse {
	owner?: { login: string };
	files: {
		[filename: string]: {
			filename: string;
			raw_url: string;
			type: string;
			language?: string;
		};
	};
}

interface CodeSnippet {
	filename: string;
	language?: string;
	rawUrl: string;
}

function CodeSnippetCard({
	filename,
	language = "plaintext",
	rawUrl,
}: CodeSnippet) {
	const [content, setContent] = useState<string | null>(null);

	useEffect(() => {
		fetch(rawUrl)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch file content");
				return res.text();
			})
			.then((text) => setContent(text))
			.catch((e) => console.error("Error fetching file content:", e));
	}, [rawUrl]);

	return (
		<div style={{ marginBottom: 16 }}>
			<h4 style={{ margin: "0 0 8px" }}>{filename}</h4>
			{null !== content ? (
				<CodeSnippetPreview language={language} content={content} />
			) : (
				<div style={{ color: "#999" }}>
					{__("Loading content...", "wp-github-gist-block")}
				</div>
			)}
		</div>
	);
}

function CodeSnippetPreview({
	language = "plaintext",
	content,
}: {
	language?: string;
	content: string;
}) {
	const highlightedContent = hljs.highlight(content, { language: language });

	return (
		<pre>
			<code
				dangerouslySetInnerHTML={{ __html: highlightedContent.value }}
			></code>
		</pre>
	);
}

export default function GistPreview({ gistId, isValid }: GistPreviewProps) {
	const [gist, setGist] = useState<GistApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isValid || !gistId) {
			setGist(null);
			setError(null);
			return;
		}
		setLoading(true);
		setError(null);
		fetch(`https://api.github.com/gists/${gistId}`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch gist");
				return res.json();
			})
			.then((data: GistApiResponse) => {
				setGist(data);
			})
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, [gistId, isValid]);

	if (!isValid) return null;
	if (loading)
		return (
			<div>{__("Loading gist information...", "wp-github-gist-block")}</div>
		);
	if (error) return <div style={{ color: "red" }}>{error}</div>;
	if (!gist) return null;

	return (
		<>
			{gist.files &&
				Object.values(gist.files).map((file) => (
					<CodeSnippetCard
						key={file.filename}
						filename={file.filename}
						language={file.language}
						rawUrl={file.raw_url}
					/>
				))}
			<div
				style={{
					marginTop: 16,
					background: "#f6f7f7",
					border: "1px solid #e2e4e7",
					borderRadius: 8,
					padding: 16,
					maxWidth: 420,
					boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
					fontSize: 15,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
					<span style={{ fontWeight: 500, marginRight: 8 }}>
						{__("Gist ID:", "wp-github-gist-block")}
					</span>
					<code style={{ fontSize: 14 }}>{gistId}</code>
					<i
						className={"fas fa-check"}
						style={{
							color: "green",
							marginLeft: 8,
							display: isValid ? "inline" : "none",
						}}
					></i>
				</div>
				{gist.owner?.login && (
					<div style={{ marginBottom: 8, color: "#333" }}>
						<span style={{ fontWeight: 500 }}>
							{__("Owner:", "wp-github-gist-block")}
						</span>{" "}
						{gist.owner.login}
					</div>
				)}
				{gist.files && (
					<div style={{ marginBottom: 0 }}>
						<span style={{ fontWeight: 500 }}>
							{__("Files:", "wp-github-gist-block")}
						</span>
						<ul style={{ margin: 0, paddingLeft: 20, listStyle: "disc" }}>
							{Object.values(gist.files).map((file) => (
								<li key={file.filename} style={{ fontSize: 14, color: "#222" }}>
									{file.filename}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
