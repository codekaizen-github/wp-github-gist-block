import { __ } from "@wordpress/i18n";

interface GistIdDisplayProps {
    gistId: string;
    isValid: boolean;
}

export default function GistIdDisplay({ gistId, isValid }: GistIdDisplayProps) {
    return (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#555" }}>{__("Current Gist ID:", "wp-github-gist-block")}</span>
            <code>{gistId}</code>
            <i
                className={"fas fa-check"}
                style={{ color: "green", marginLeft: 8, display: isValid ? "inline" : "none" }}
            ></i>
        </div>
    );
}
