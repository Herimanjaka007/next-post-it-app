import { useNotes } from "@/context/NotesContext";
import { NoteFrontEnd } from "@/types/noteFrontend";
import { useCallback, useRef, useState } from "react";

/**
 * Hooks to wait for a certain time before updating the note, we use it to prevent database overload
 * when the user is typing, we wait for 2 seconds before updating the note
 * @param note note to be updated 
 * @param timeout time to wait before updating the note
 * @param timeout default is 2 seconds
 * @returns the loading state and the function waitAndUpdate
 */
export const useWaitUpdate = (
    note: NoteFrontEnd,
    timeout: number = 2
) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const { updateNote } = useNotes();

    const waitAndUpdate = useCallback(async () => {
        setLoading(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const idTimer = setTimeout(() => {
            updateNote(note.id, note);
            timerRef.current = undefined;
            setLoading(false);
        }, timeout * 1000);
        timerRef.current = idTimer;
    }, [updateNote, timeout, note]);

    return { loading, waitAndUpdate };
}