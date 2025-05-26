import { useState } from "react";
import { Button, Modal } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useGistValidation } from "./hooks/useGistValidation";

interface GistIdModalProps {
	initialValue: string;
	onSave: (value: string) => void;
	onCancel: () => void;
}

export default function GistIdModal({
	initialValue,
	onSave,
	onCancel,
}: GistIdModalProps) {
	const [input, setInput] = useState(initialValue);
	const isValid = useGistValidation(input);

	return (
		<Modal
			title={__("Set GitHub Gist ID", "wp-github-gist-block")}
			onRequestClose={onCancel}
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
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={__("Enter Gist ID", "wp-github-gist-block")}
					style={{
						width: "100%",
						background: "#fff",
						backgroundColor: input
							? isValid
								? "rgba(144, 238, 144, 0.2)"
								: "rgba(255, 99, 71, 0.1)"
							: "#fff",
						border: "1px solid #dcdcde",
						borderRadius: "4px",
						boxShadow: "none",
						outline: "none",
						fontSize: "16px",
						padding: "8px 12px",
						paddingRight: "2rem",
						transition: "border-color 0.2s",
					}}
					onFocus={(e) => (e.target.style.borderColor = "#757575")}
					onBlur={(e) => (e.target.style.borderColor = "#dcdcde")}
				/>
				{input && (
					<span
						style={{
							position: "absolute",
							right: "10px",
							top: "50%",
							transform: "translateY(-50%)",
							color: isValid ? "green" : "red",
							marginRight: "1rem",
						}}
					>
						<i className={isValid ? "fas fa-check" : "fas fa-times"}></i>
					</span>
				)}
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
				<Button variant="secondary" onClick={onCancel}>
					{__("Cancel", "wp-github-gist-block")}
				</Button>
				<Button
					variant="primary"
					disabled={!isValid}
					onClick={() => onSave(input)}
				>
					{__("Save", "wp-github-gist-block")}
				</Button>
			</div>
		</Modal>
	);
}
