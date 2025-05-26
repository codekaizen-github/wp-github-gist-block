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
import { Placeholder } from "@wordpress/components";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<CustomBlockEditProps>) {
	const [isValidGistId, setIsValidGistId] = useState<boolean>(false);
	const [debouncedGistId, setDebouncedGistId] = useState<string | undefined>(
		attributes.gistId,
	);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedGistId(attributes.gistId);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [attributes.gistId]);

	useEffect(() => {
		if (debouncedGistId) {
			fetch(`https://api.github.com/gists/${debouncedGistId}`)
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
		} else {
			setIsValidGistId(false);
		}
	}, [debouncedGistId]);

	return (
		<>
			<Placeholder
				icon={<i className="fab fa-github" style={{ marginRight: 4 }}></i>}
				label={__("GitHub Gist", "wp-github-gist-block")}
				instructions={__(
					"Enter the Gist ID to display the content.",
					"wp-github-gist-block",
				)}
				className="github-gist-placeholder"
				children={
					<div
						style={{
							position: "relative",
							display: "inline-block",
							width: "100%",
						}}
					>
						<input
							{...useBlockProps()}
							type="text"
							onChange={(event) => {
								setAttributes({ gistId: event.target.value });
							}}
							placeholder={__("Enter Gist ID", "wp-github-gist-block")}
							value={attributes.gistId ?? ""}
							style={{
								width: "-webkit-fill-available",
								backgroundColor: attributes.gistId
									? isValidGistId
										? "rgba(144, 238, 144, 0.2)"
										: "rgba(255, 99, 71, 0.1)"
									: "transparent",
							}}
						/>
						{attributes.gistId && (
							<span
								style={{
									position: "absolute",
									right: "0",
									top: "50%",
									transform: "translateY(-50%)",
									color: isValidGistId ? "green" : "red",
									marginRight: "1rem",
								}}
							>
								<i
									className={isValidGistId ? "fas fa-check" : "fas fa-times"}
								></i>
							</span>
						)}
					</div>
				}
			/>
		</>
	);
}
