import { NotePayload } from "@/types/notePayload";
import { useCallback, useRef } from "react";

export const useWaitUpdate = (
    payload: NotePayload,
    updateNote: (note: NotePayload) => void,
    timeout: number = 2
) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const waitAndUpdate = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const idTimer = setTimeout(() => {
            updateNote(payload);
            timerRef.current = undefined;
        }, timeout * 1000);
        timerRef.current = idTimer;
    }, [payload, updateNote, timeout]);

    return waitAndUpdate;
}