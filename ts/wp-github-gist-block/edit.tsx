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
import { Placeholder, Button, Modal } from "@wordpress/components";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<CustomBlockEditProps>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [gistIdInput, setGistIdInput] = useState<string>(attributes.gistId ?? "");
	const [isValidGistId, setIsValidGistId] = useState<boolean>(false);
	const [debouncedGistId, setDebouncedGistId] = useState<string | undefined>(attributes.gistId);
	const [isSavedGistIdValid, setIsSavedGistIdValid] = useState<boolean>(false);

	// Debounce input inside modal
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedGistId(gistIdInput);
		}, 500);
		return () => clearTimeout(handler);
	}, [gistIdInput]);

	// Validate debounced input (modal input)
	useEffect(() => {
		if (debouncedGistId) {
			fetch(`https://api.github.com/gists/${debouncedGistId}`)
				.then((response) => {
					setIsValidGistId(response.ok);
				})
				.catch(() => setIsValidGistId(false));
		} else {
			setIsValidGistId(false);
		}
	}, [debouncedGistId]);

	// Validate saved gistId for main block checkmark
	useEffect(() => {
		if (attributes.gistId) {
			fetch(`https://api.github.com/gists/${attributes.gistId}`)
				.then((response) => {
					setIsSavedGistIdValid(response.ok);
				})
				.catch(() => setIsSavedGistIdValid(false));
		} else {
			setIsSavedGistIdValid(false);
		}
	}, [attributes.gistId]);

	const blockProps = useBlockProps();

	if (!attributes.gistId) {
		return (
			<Placeholder
				icon={<i className="fab fa-github" style={{ marginRight: 4 }}></i>}
				label={__("GitHub Gist", "wp-github-gist-block")}
				instructions={__("Enter the Gist ID to display the content.", "wp-github-gist-block")}
				className="github-gist-placeholder"
			>
				<Button
					variant="primary"
					onClick={() => {
						setGistIdInput("");
						setIsModalOpen(true);
					}}
				>
					{__("Add Gist ID", "wp-github-gist-block")}
				</Button>
				{isModalOpen && (
					<Modal
						title={__("Set GitHub Gist ID", "wp-github-gist-block")}
						onRequestClose={() => setIsModalOpen(false)}
					>
						<div
							style={{
								position: "relative",
								width: "100%",
								marginBottom: 24,
								background: "#f6f7f7",
								border: "1px solid #dcdcde",
								borderRadius: "6px",
								padding: "24px 16px",
								boxSizing: "border-box",
							}}
						>
							<input
								type="text"
								value={gistIdInput}
								onChange={e => setGistIdInput(e.target.value)}
								placeholder={__("Enter Gist ID", "wp-github-gist-block")}
								style={{
									width: "100%",
									background: "#fff",
									backgroundColor: gistIdInput
										? isValidGistId
											? "rgba(144, 238, 144, 0.2)"
											: "rgba(255, 99, 71, 0.1)"
										: "#fff",
									paddingRight: "30px",
									border: "1px solid #dcdcde",
									borderRadius: "4px",
									boxShadow: "none",
									outline: "none",
									fontSize: "16px",
									padding: "8px 12px",
									transition: "border-color 0.2s",
								}}
								onFocus={e => (e.target.style.borderColor = "#757575")}
								onBlur={e => (e.target.style.borderColor = "#dcdcde")}
							/>
							{gistIdInput && (
								<span
									style={{
										position: "absolute",
										right: "10px",
										top: "50%",
										transform: "translateY(-50%)",
										color: isValidGistId ? "green" : "red",
									}}
								>
									<i className={isValidGistId ? "fas fa-check" : "fas fa-times"}></i>
								</span>
							)}
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
							<Button
								variant="secondary"
								onClick={() => setIsModalOpen(false)}
							>
								{__("Cancel", "wp-github-gist-block")}
							</Button>
							<Button
								variant="primary"
								disabled={!isValidGistId}
								onClick={() => {
									setAttributes({ gistId: gistIdInput });
									setIsModalOpen(false);
								}}
							>
								{__("Save", "wp-github-gist-block")}
							</Button>
						</div>
					</Modal>
				)}
			</Placeholder>
		);
	}

	return (
		<div {...blockProps}>
			<Button
				variant="primary"
				onClick={() => {
					setGistIdInput(attributes.gistId ?? "");
					setIsModalOpen(true);
				}}
			>
				{attributes.gistId ? __("Edit Gist ID", "wp-github-gist-block") : __("Add Gist ID", "wp-github-gist-block")}
			</Button>
			{attributes.gistId && (
				<div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
					<span style={{ color: "#555" }}>{__("Current Gist ID:", "wp-github-gist-block")}</span>
					<code>{attributes.gistId}</code>
					<i
						className={"fas fa-check"}
						style={{ color: "green", marginLeft: 8, display: isSavedGistIdValid ? "inline" : "none" }}
					></i>
				</div>
			)}
			{isModalOpen && (
				<Modal
					title={__("Set GitHub Gist ID", "wp-github-gist-block")}
					onRequestClose={() => setIsModalOpen(false)}
				>
					<div
						style={{
							position: "relative",
							width: "100%",
							marginBottom: 24,
							background: "#f6f7f7",
							border: "1px solid #dcdcde",
							borderRadius: "6px",
							padding: "24px 16px",
							boxSizing: "border-box",
						}}
					>
						<input
							type="text"
							value={gistIdInput}
							onChange={e => setGistIdInput(e.target.value)}
							placeholder={__("Enter Gist ID", "wp-github-gist-block")}
							style={{
								width: "100%",
								background: "#fff",
								backgroundColor: gistIdInput
									? isValidGistId
										? "rgba(144, 238, 144, 0.2)"
										: "rgba(255, 99, 71, 0.1)"
									: "#fff",
								paddingRight: "30px",
								border: "1px solid #dcdcde",
								borderRadius: "4px",
								boxShadow: "none",
								outline: "none",
								fontSize: "16px",
								padding: "8px 12px",
								transition: "border-color 0.2s",
							}}
							onFocus={e => (e.target.style.borderColor = "#757575")}
							onBlur={e => (e.target.style.borderColor = "#dcdcde")}
						/>
						{gistIdInput && (
							<span
								style={{
									position: "absolute",
									right: "10px",
									top: "50%",
									transform: "translateY(-50%)",
									color: isValidGistId ? "green" : "red",
								}}
							>
								<i className={isValidGistId ? "fas fa-check" : "fas fa-times"}></i>
							</span>
						)}
					</div>
					<div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
						<Button
							variant="secondary"
							onClick={() => setIsModalOpen(false)}
						>
							{__("Cancel", "wp-github-gist-block")}
						</Button>
						<Button
							variant="primary"
							disabled={!isValidGistId}
							onClick={() => {
								setAttributes({ gistId: gistIdInput });
								setIsModalOpen(false);
							}}
						>
							{__("Save", "wp-github-gist-block")}
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
}
