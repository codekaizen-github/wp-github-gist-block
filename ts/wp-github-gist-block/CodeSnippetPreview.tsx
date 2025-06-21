import hljs from "highlight.js";

export default function CodeSnippetPreview({
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
				className={`language-${language.toLowerCase()}`}
				dangerouslySetInnerHTML={{ __html: highlightedContent.value }}
			></code>
		</pre>
	);
}
