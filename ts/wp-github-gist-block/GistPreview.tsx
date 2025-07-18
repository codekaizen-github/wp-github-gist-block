import { useEffect, useState, useRef } from "react";
import { __ } from "@wordpress/i18n";
import CodeSnippetCard from "./CodeSnippetCard";

interface GistPreviewProps {
	gistId: string;
	isValid: boolean;
	onLoad?: (content: string) => void;
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

export default function GistPreview({
	gistId,
	isValid,
	onLoad,
}: GistPreviewProps) {
	const [gist, setGist] = useState<GistApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	function handleOnLoad() {
		if (ref.current && onLoad) {
			const content = ref.current.innerHTML;
			onLoad(content);
		}
	}

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
			<div
				style={{
					marginTop: 16,
					marginBottom: 16,
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
			<div ref={ref}>
				{gist.files &&
					Object.values(gist.files).map((file) => (
						<CodeSnippetCard
							key={file.filename}
							filename={file.filename}
							language={file.language}
							rawUrl={file.raw_url}
							onLoad={handleOnLoad}
						/>
					))}
			</div>
		</>
	);
}
