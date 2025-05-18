/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { BlockEditProps } from "@wordpress/blocks";
import { CustomBlockEditProps } from "./interfaces";
import { useState, useEffect } from "react";

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<CustomBlockEditProps>) {
	const [isValidGistId, setIsValidGistId] = useState<boolean>(false);
	useEffect(() => {
		if (attributes.gistId) {
			fetch(`https://api.github.com/gists/${attributes.gistId}`)
				.then((response) => {
					if (response.ok) {
						setIsValidGistId(true);
					} else {
						setIsValidGistId(false);
					}
				})
				.catch((error) => {
					console.error("Error fetching Gist ID:", error);
					setIsValidGistId(false);
				});
		}
	}, [attributes.gistId]);

	return (
		<>
			<p>{__("Gist ID", "wp-github-gist-block")}</p>
			<input
				{...useBlockProps()}
				type="text"
				onChange={(event) => {
					setAttributes({ gistId: event.target.value });
				}}
				placeholder={__("Enter Gist ID", "wp-github-gist-block")}
				value={attributes.gistId ?? ""}
			></input>
			{attributes.gistId && (
				<div style={{ marginTop: "10px" }}>
					{isValidGistId ? (
						<span
							style={{
								color: "green",
								display: "flex",
								alignItems: "center",
								gap: "5px",
							}}
						>
							✅ {__("Valid Gist ID", "wp-github-gist-block")}
						</span>
					) : (
						<span
							style={{
								color: "red",
								display: "flex",
								alignItems: "center",
								gap: "5px",
							}}
						>
							❌ {__("Invalid Gist ID", "wp-github-gist-block")}
						</span>
					)}
				</div>
			)}
		</>
	);
}
