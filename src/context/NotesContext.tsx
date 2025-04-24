import { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { notesData as initialNotesData } from "@/data/notesData";
import { colorPalettes } from "@/components/notes/colorPalettes";

type ColorKey = keyof typeof colorPalettes;

interface Note {
    id: number;
    content: string;
    color: ColorKey;
    x: number;
    y: number;
}

interface NotesContextType {
    notes: Note[];
    activeNoteId: number | null;
    setActiveNoteId: (id: number | null) => void;
    addNote: (note: Omit<Note, "id">) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>(initialNotesData);
    const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

    const addNote = useCallback((note: Omit<Note, "id">) => {
        setNotes((prevNotes) => [
            ...prevNotes,
            { id: prevNotes.length > 0 ? prevNotes[prevNotes.length - 1].id + 1 : 1, ...note },
        ]);
    }, []);

    return (
        <NotesContext.Provider value={{ notes, activeNoteId, setActiveNoteId, addNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = (): NotesContextType => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};
