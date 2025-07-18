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
import { useState } from "react";
import { Placeholder, Button } from "@wordpress/components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import GistIdModal from "./GistIdModal";
import GistPreview from "./GistPreview";
import { useGistValidation } from "./hooks/useGistValidation";

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<CustomBlockEditProps>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isSavedGistIdValid = useGistValidation(attributes.gistId ?? "");

	const blockProps = useBlockProps();

	if (!attributes.gistId) {
		return (
			<Placeholder
				icon={<i className="fab fa-github" style={{ marginRight: 4 }}></i>}
				label={__("GitHub Gist", "wp-github-gist-block")}
				instructions={__(
					"Enter the Gist ID to display the content.",
					"wp-github-gist-block",
				)}
				className="github-gist-placeholder"
			>
				<Button
					variant="primary"
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					{__("Add Gist ID", "wp-github-gist-block")}
				</Button>
				{isModalOpen && (
					<GistIdModal
						initialValue={""}
						onSave={(value) => {
							setAttributes({ ...attributes, gistId: value });
							setIsModalOpen(false);
						}}
						onCancel={() => setIsModalOpen(false)}
					/>
				)}
			</Placeholder>
		);
	}

	return (
		<div {...blockProps}>
			<Button
				variant="primary"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				{attributes.gistId
					? __("Edit Gist ID", "wp-github-gist-block")
					: __("Add Gist ID", "wp-github-gist-block")}
			</Button>
			<GistPreview
				gistId={attributes.gistId ?? ""}
				isValid={isSavedGistIdValid}
				onLoad={(content) => {
					// You can handle the loaded content if needed
					setAttributes({
						...attributes,
						rawContent: content,
					});
				}}
			/>
			{isModalOpen && (
				<GistIdModal
					initialValue={attributes.gistId ?? ""}
					onSave={(value) => {
						setAttributes({ ...attributes, gistId: value });
						setIsModalOpen(false);
					}}
					onCancel={() => setIsModalOpen(false)}
				/>
			)}
		</div>
	);
}
