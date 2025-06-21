import { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import CodeSnippetPreview from "./CodeSnippetPreview";

interface CodeSnippet {
	filename: string;
	language?: string;
	rawUrl: string;
	onLoad?: () => void;
}

export default function CodeSnippetCard({
	filename,
	language = "plaintext",
	rawUrl,
	onLoad,
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
				<CodeSnippetPreview
					language={language}
					content={content}
					onLoad={() => {
						if (onLoad) {
							onLoad();
						}
					}}
				/>
			) : (
				<div style={{ color: "#999" }}>
					{__("Loading content...", "wp-github-gist-block")}
				</div>
			)}
		</div>
	);
}
