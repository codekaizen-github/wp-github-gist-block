import hljs from "highlight.js";
import { useEffect } from "react";

export default function CodeSnippetPreview({
	language = "plaintext",
	content,
	onLoad,
}: {
	language?: string;
	content: string;
	onLoad?: () => void;
}) {
	const highlightedContent = hljs.highlight(content, { language: language });

	useEffect(() => {
		if (onLoad) {
			onLoad();
		}
	});

	return (
		<pre>
			<code
				className={`language-${language.toLowerCase()}`}
				dangerouslySetInnerHTML={{ __html: highlightedContent.value }}
			></code>
		</pre>
	);
}
