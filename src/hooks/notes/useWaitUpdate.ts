import { useNotes } from "@/context/NotesContext";
import { NotePayload } from "@/types/notePayload";
import { useCallback, useRef, useState } from "react";


export const useWaitUpdate = (
    noteId: string,
    timeout: number = 2
) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const { updateNote } = useNotes();

    const waitAndUpdate = useCallback(async (payload: NotePayload) => {
        setLoading(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const idTimer = setTimeout(() => {
            updateNote(noteId, payload);
            timerRef.current = undefined;
            setLoading(false);
        }, timeout * 1000);
        timerRef.current = idTimer;
    }, [updateNote, timeout, noteId]);

    return { loading, waitAndUpdate };
}