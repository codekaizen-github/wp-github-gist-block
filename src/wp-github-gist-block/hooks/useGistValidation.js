import { useState, useEffect } from "react";
export function useGistValidation(gistId) {
    const [isValid, setIsValid] = useState(false);
    const [debouncedGistId, setDebouncedGistId] = useState(gistId);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedGistId(gistId);
        }, 500);
        return () => clearTimeout(handler);
    }, [gistId]);
    useEffect(() => {
        if (debouncedGistId) {
            fetch(`https://api.github.com/gists/${debouncedGistId}`)
                .then((response) => setIsValid(response.ok))
                .catch(() => setIsValid(false));
        }
        else {
            setIsValid(false);
        }
    }, [debouncedGistId]);
    return isValid;
}
